import prismaClient from "../prisma/index.js";
import type { CreateOrderDTO } from "../dtos/order/CreateOrderDTO.js";
import type { UpdateOrderDTO } from "../dtos/order/UpdateOrderDTO.js";

export class OrderService {
    async createOrder(orderData: CreateOrderDTO) {
        return prismaClient.order.create({
            data: orderData,
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

    async updateOrderStatus(orderId: number, newStatus: string){
        const order = await prismaClient.order.findUnique({
            where: {orderId},
        });

        if(!order){
            throw new Error("Pedido com ID ${orderId} não encontrado");
        }

        const updatedOrder = await prismaClient.order.update({
            where: {orderId},
            data: {status: newStatus},
            include:{
                OrderItem: True,
            }
        });

        if(NewStatus == "CANCELED"){
            console.log("[ALERTA] Pedido ${orederId} cancelado. Estoque precisa ser restaurado!");
        }

        return updatedOrder;
    }
}
