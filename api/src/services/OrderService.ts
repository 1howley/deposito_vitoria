import prismaClient from "../prisma/index.js";
import type { CreateOrderDTO } from "../dtos/order/CreateOrderDTO.js";
import type { UpdateOrderDTO } from "../dtos/order/UpdateOrderDTO.js";
import { OrderItemController } from "../controllers/OrderItemController.js";

export class OrderService {
    async createOrder(userId: number, orderData: CreateOrderDTO) {
        return prismaClient.$transaction(async (tx) =>{
            const cart = await tx.cart.findUnique({
                where: {userId},
                include: {
                    CartItem: {
                        include: {
                            product: true,
                        },
                    },
                },
            });

            if(!cart || cart.CartItem.length === 0){
                throw new Error("O carrinho está vazio. Não é possível criar o pedido.");
            }

            const order = await tx.order.create({
                data: {
                    userId: userId,
                },
            });

            const orderItemsData: any[] = [];

            for(const item of cart.CartItem){
                const product = item.product;

                if (product.stock < item.quantity){
                    throw new Error(`Estoque insuficiente para o produto: ${product.name}. Apenas ${product.stock} em estoque.`);
                }
                orderItemsData.push({
                    orderId: order.id,
                    productId: product.id,
                    quantity: item.quantity,
                    price: product.price,
                });

                await tx.product.update({
                    where: {id: product.id},
                    data: {
                        stock: {
                            decrement: item.quantity, 
                        },
                    },
                });
            } 

            await tx.orderItem.createMany({
                data: orderItemsData,
            });

            await tx.cart.delete({
                where: {userId},
            });

            return order;
        }); 
    }

    async getAllOrders() {
        return prismaClient.order.findMany();
    }

    async getOrderById(orderId: number) {
        return prismaClient.order.findUnique({
            where: { orderId },
        });
    }

    async updateOrder(orderId: number, orderData: UpdateOrderDTO) {
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

    async restoreStock(orderId: number, tx: any){
        const orderItems = await tx.orderItem.findMany({
            where: {orderId: orderId}
        });

        for(const item of orderItems){
            await tx.product.update({
                where: {id: item.productId},
                data : {
                    stock: {
                        increment: item.quantity,
                    },
                },
            });
        }
    }

    async updateOrderStatus(orderId: number, newStatus: string){
        return prismaClient.$transaction(async (tx) => {
            const order = await tx.order.findUnique({
                where: {orderId},
            });

            if(!order){
                throw new Error(`Pedido com ID ${orderId} não encontrado`);
            }

            const updatedOrder = await tx.order.update({
                where: {orderId},
                data: {status: newStatus},
                include:{
                    OrderItem: true,
                },
            });

            if(newStatus === "CANCELED" && order.status !== "CANCELED"){
                await this.restoreStock(orderId, tx);
                console.log(`Estoque restaurado para o Pedido ${orderId}.`);
            }

            return updatedOrder;
        });
    }
}
