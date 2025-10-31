import prismaClient from "../prisma/index.js";
import type { CreateOrderItemDTO } from "../dtos/orderItem/CreateOrderItemDTO.js";
import type { UpdateOrderItemDTO } from "../dtos/orderItem/UpdateOrderItemDTO.js";

export class OrderItemService {
    async createOrderItem(orderItemData: CreateOrderItemDTO) {
        return prismaClient.orderItem.create({
            data: orderItemData,
        });
    }

    async getAllOrderItems() {
        return prismaClient.orderItem.findMany();
    }

    async getOrderItemById(orderItemId: number) {
        return prismaClient.orderItem.findUnique({
            where: { orderItemId },
        });
    }

    async updateOrderItem(
        orderItemId: number,
        orderItemData: UpdateOrderItemDTO
    ) {
        return prismaClient.orderItem.update({
            where: { orderItemId },
            data: orderItemData,
        });
    }

    async deleteOrderItem(orderItemId: number) {
        return prismaClient.orderItem.delete({
            where: { orderItemId },
        });
    }
}
