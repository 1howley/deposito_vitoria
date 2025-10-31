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
}
