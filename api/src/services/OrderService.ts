import prismaClient from "../prisma/index.js";
import type { CreateOrderDTO } from "../dtos/order/CreateOrderDTO.js";
import { AbacatePayService } from "./AbacatePayService.js";
// Importamos o Enum e tipos do Prisma para evitar conflito de tipagem
import { OrderStatus, type Prisma } from "@prisma/client";

// Definição local para update parcial, caso seu DTO não esteja exportando corretamente
interface UpdateOrderData {
    status?: OrderStatus;
    // outros campos se houver
}

const abacateService = new AbacatePayService();

export class OrderService {
    async createOrder(userId: string, orderData: CreateOrderDTO) {
        return prismaClient.$transaction(async (tx) => {
            // 1. Buscar Carrinho e Validar Estoque
            const cart = await tx.cart.findUnique({
                where: { clientId: userId },
                include: {
                    items: { 
                        include: { product: true },
                    },
                },
            });

            if (!cart || cart.items.length === 0) {
                throw new Error("Carrinho vazio ou não encontrado.");
            }

            // Validação de Estoque
            for (const item of cart.items) {
                if (item.product.stock < item.quantity) {
                    throw new Error(`Estoque insuficiente: ${item.product.name}`);
                }
                
                // Baixa no Estoque (Corrigido: productId ao invés de id)
                await tx.product.update({
                    where: { productId: item.product.productId },
                    data: { stock: { decrement: item.quantity } },
                });
            }

            // 2. Criar/Salvar Endereço
            const newAddress = await tx.address.create({
                data: {
                    clientId: userId,
                    zipCode: orderData.billingAddress.zipCode,
                    street: orderData.billingAddress.street,
                    number: orderData.billingAddress.number,
                    neighborhood: orderData.billingAddress.neighborhood,
                    complement: orderData.billingAddress.complement ?? null,
                    type: "DELIVERY", 
                },
            });

            // 3. Criar Pagamento
            const newPayment = await tx.payment.create({
                data: {
                    method: orderData.paymentMethod,
                    status: "PENDING",
                    amountPaid: 0,
                },
            });

            // 4. Criar o Pedido
            const newOrder = await tx.order.create({
                data: {
                    clientId: userId,
                    deliveryAddressId: newAddress.addressId,
                    paymentId: newPayment.paymentId,
                    totalAmount: orderData.amount / 100, 
                    status: "PENDING",
                },
            });

            // 5. Mover Itens
            const orderItemsData = cart.items.map((item) => ({
                orderId: newOrder.orderId,
                productId: item.productId,
                quantity: item.quantity,
                paidUnitPrice: item.product.basePrice,
            }));

            await tx.orderItem.createMany({
                data: orderItemsData,
            });

            // 6. Limpar Carrinho
            await tx.cartItem.deleteMany({
                where: { cartId: cart.cartId },
            });

            // 7. Integração com AbacatePay
            const abacateResponse = await abacateService.createBilling({
                amount: orderData.amount,
                customer: orderData.customer,
                items: orderData.items,
            });

            return {
                orderId: newOrder.orderId,
                status: newOrder.status,
                paymentUrl: abacateResponse.paymentUrl,
                total: newOrder.totalAmount
            };
        });
    }

    async getAllOrders(skip: number, take: number) {
        const totalItems = await prismaClient.order.count();
        const orders = await prismaClient.order.findMany({
            skip: skip,
            take: take,
            include: {
                user: {
                    // CORREÇÃO: id -> userId
                    select: { userId: true, name: true, email: true },
                },
                // CORREÇÃO: OrderItem -> items (conforme schema)
                items: true,
            },
        });

        return {
            orders,
            meta: {
                totalItems,
                limit: take,
                currentPage: skip / take + 1,
                totalPages: Math.ceil(totalItems / take),
            },
        };
    }

    async getOrderById(orderId: number) {
        return prismaClient.order.findUnique({
            where: { orderId },
            include: {
                items: true // Incluir itens ao buscar por ID é útil
            }
        });
    }

    // CORREÇÃO: Tipagem do orderData para aceitar o formato do Prisma
    async updateOrder(orderId: number, orderData: Prisma.OrderUpdateInput) {
        return prismaClient.order.update({
            where: { orderId },
            data: orderData,
        });
    }

    async deleteOrder(orderId: number) {
        return prismaClient.order.delete({
            where: { orderId },
        });
    }

    async restoreStock(orderId: number, tx: Prisma.TransactionClient) {
        const orderItems = await tx.orderItem.findMany({
            where: { orderId: orderId },
        });

        for (const item of orderItems) {
            await tx.product.update({
                // CORREÇÃO: id -> productId
                where: { productId: item.productId },
                data: {
                    stock: {
                        increment: item.quantity,
                    },
                },
            });
        }
    }

    async updateOrderStatus(orderId: number, newStatus: OrderStatus) {
        return prismaClient.$transaction(async (tx) => {
            const order = await tx.order.findUnique({
                where: { orderId },
            });

            if (!order) {
                throw new Error(`Pedido com ID ${orderId} não encontrado`);
            }

            const updatedOrder = await tx.order.update({
                where: { orderId },
                data: { status: newStatus },
                include: {
                    // CORREÇÃO: OrderItem -> items
                    items: true,
                },
            });

            // CORREÇÃO: CANCELED -> CANCELLED (Verifique seu schema, geralmente é CANCELLED)
            if (newStatus === "CANCELLED" && order.status !== "CANCELLED") {
                await this.restoreStock(orderId, tx);
                console.log(`Estoque restaurado para o Pedido ${orderId}.`);
            }

            return updatedOrder;
        });
    }
}