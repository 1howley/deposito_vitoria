import type { FastifyReply, FastifyRequest } from "fastify";
import { OrderItemService } from "../services/OrderItemService.js";

const orderItemService = new OrderItemService();

export class OrderItemController {
    async createOrderItem(req: FastifyRequest, reply: FastifyReply) {
        try {
            const orderItem = await orderItemService.createOrderItem(
                req.body as any
            );
            reply.code(201).send(orderItem);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async getAllOrderItems(req: FastifyRequest, reply: FastifyReply) {
        try {
            const orderItems = await orderItemService.getAllOrderItems();
            reply.code(200).send(orderItems);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async getOrderItemById(
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const orderItem = await orderItemService.getOrderItemById(
                parseInt(req.params.id, 10)
            );
            if (orderItem) {
                reply.code(200).send(orderItem);
            } else {
                reply.code(404).send({ message: "OrderItem not found" });
            }
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async updateOrderItem(
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const orderItem = await orderItemService.updateOrderItem(
                parseInt(req.params.id, 10),
                req.body as any
            );
            reply.code(200).send(orderItem);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async deleteOrderItem(
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            await orderItemService.deleteOrderItem(parseInt(req.params.id, 10));
            reply.code(204).send();
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }
}
