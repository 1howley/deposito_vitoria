import type { FastifyReply, FastifyRequest } from "fastify";
import { OrderService } from "../services/OrderService.js";

const orderService = new OrderService();

export class OrderController {
    async createOrder(req: FastifyRequest, reply: FastifyReply) {
        try {
            const order = await orderService.createOrder(req.body as any);
            reply.code(201).send(order);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async getAllOrders(req: FastifyRequest, reply: FastifyReply) {
        try {
            const orders = await orderService.getAllOrders();
            reply.code(200).send(orders);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async getOrderById(
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const order = await orderService.getOrderById(
                parseInt(req.params.id, 10)
            );
            if (order) {
                reply.code(200).send(order);
            } else {
                reply.code(404).send({ message: "Order not found" });
            }
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async updateOrder(
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const order = await orderService.updateOrder(
                parseInt(req.params.id, 10),
                req.body as any
            );
            reply.code(200).send(order);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async deleteOrder(
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            await orderService.deleteOrder(parseInt(req.params.id, 10));
            reply.code(204).send();
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }
}
