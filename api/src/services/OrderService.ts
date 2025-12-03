import prismaClient from "../prisma/index.js";
import type { CreateOrderDTO } from "../dtos/order/CreateOrderDTO.js";
import { AbacatePayService } from "./AbacatePayService.js";
import { OrderStatus, type Prisma } from "@prisma/client";

const abacateService = new AbacatePayService();

export class OrderService {
    async createOrder(userId: string, orderData: CreateOrderDTO) {
        // Usamos transação para garantir que se o pagamento falhar, o estoque volta
        return prismaClient.$transaction(async (tx) => {
            let totalCalculated = 0;
            const orderItemsData = [];

            // 1. Validação de Estoque e Cálculo de Preço
            for (const item of orderData.items) {
                const product = await tx.product.findUnique({ where: { productId: item.id } });
                
                if (!product) throw new Error(`Produto ID ${item.id} não encontrado.`);
                if (product.stock < item.quantity) {
                    throw new Error(`Estoque insuficiente para: ${product.name}. Disponível: ${product.stock}`);
                }

                // DEDUZ ESTOQUE (Reserva)
                await tx.product.update({
                    where: { productId: item.id },
                    data: { stock: { decrement: item.quantity } }
                });

                const unitPrice = Number(product.basePrice);
                totalCalculated += unitPrice * item.quantity;
                
                orderItemsData.push({
                    productId: product.productId,
                    quantity: item.quantity,
                    paidUnitPrice: unitPrice
                });
            }

            // 2. Criar Endereço de Entrega
            const newAddress = await tx.address.create({
                data: {
                    clientId: userId,
                    zipCode: orderData.billingAddress.zipCode,
                    street: orderData.billingAddress.street,
                    number: orderData.billingAddress.number,
                    neighborhood: orderData.billingAddress.neighborhood,
                    city: orderData.billingAddress.city,
                    state: orderData.billingAddress.state,
                    complement: orderData.billingAddress.complement,
                    type: "DELIVERY", 
                },
            });

            // 3. Criar Registro de Pagamento
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
                    totalAmount: totalCalculated, 
                    status: "PENDING",
                },
            });

            // 5. Salvar Itens
            await tx.orderItem.createMany({
                data: orderItemsData.map(i => ({ ...i, orderId: newOrder.orderId }))
            });

            // 6. Limpar o Carrinho do usuário
            const cart = await tx.cart.findUnique({ where: { clientId: userId } });
            if (cart) {
                await tx.cartItem.deleteMany({ where: { cartId: cart.cartId } });
            }

            // 7. Integração AbacatePay
            // Passamos os itens para o AbacatePay também para aparecer no checkout deles
            const abacateResponse = await abacateService.createBilling({
                amount: Math.round(totalCalculated * 100),
                customer: orderData.customer,
                items: orderItemsData.map((item) => ({
                    id: item.productId,
                    quantity: item.quantity,
                    unitPrice: item.paidUnitPrice
                })),
                orderId: newOrder.orderId // <--- ADICIONADO O ID AQUI
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
            skip,
            take,
            orderBy: { createdAt: "desc" }, // Ordenar por mais recente
            include: {
                user: { select: { userId: true, name: true, email: true } },
                items: { include: { product: true } }, // Inclui detalhes do produto
            },
        });

        return {
            orders,
            meta: {
                totalItems,
                limit: take,
                currentPage: Math.floor(skip / take) + 1,
                totalPages: Math.ceil(totalItems / take),
            },
        };
    }

    async getOrderById(orderId: number) {
        return prismaClient.order.findUnique({
            where: { orderId },
            include: { items: { include: { product: true } } }
        });
    }

    async updateOrderStatus(orderId: number, newStatus: OrderStatus) {
        return prismaClient.$transaction(async (tx) => {
            const order = await tx.order.findUnique({ where: { orderId } });
            if (!order) throw new Error("Pedido não encontrado");

            // Se cancelar, devolve o estoque
            if (newStatus === "CANCELLED" && order.status !== "CANCELLED") {
                const items = await tx.orderItem.findMany({ where: { orderId } });
                for (const item of items) {
                    await tx.product.update({
                        where: { productId: item.productId },
                        data: { stock: { increment: item.quantity } }
                    });
                }
            }

            return tx.order.update({
                where: { orderId },
                data: { status: newStatus }
            });
        });
    }
    
    // Método genérico para update
    async updateOrder(orderId: number, data: Prisma.OrderUpdateInput) {
        return prismaClient.order.update({ where: { orderId }, data });
    }
    
    async deleteOrder(orderId: number) {
        return prismaClient.order.delete({ where: { orderId }});
    }
}