import type { FastifyReply, FastifyRequest } from "fastify";
import { PaymentService } from "../services/PaymentService.js";

const paymentService = new PaymentService();

export class PaymentController {
    async createPayment(req: FastifyRequest, reply: FastifyReply) {
        try {
            const payment = await paymentService.createPayment(req.body as any);
            reply.code(201).send(payment);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async getAllPayments(req: FastifyRequest, reply: FastifyReply) {
        try {
            const payments = await paymentService.getAllPayments();
            reply.code(200).send(payments);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async getPaymentById(
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const payment = await paymentService.getPaymentById(
                parseInt(req.params.id, 10)
            );
            if (payment) {
                reply.code(200).send(payment);
            } else {
                reply.code(404).send({ message: "Payment not found" });
            }
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async updatePayment(
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const payment = await paymentService.updatePayment(
                parseInt(req.params.id, 10),
                req.body as any
            );
            reply.code(200).send(payment);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async deletePayment(
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            await paymentService.deletePayment(parseInt(req.params.id, 10));
            reply.code(204).send();
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }
}
