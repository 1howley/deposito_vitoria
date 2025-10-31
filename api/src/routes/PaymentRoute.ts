import type { FastifyInstance } from "fastify";
import { PaymentController } from "../controllers/PaymentController.js";

const paymentController = new PaymentController();

export const PaymentRoute = async (fastify: FastifyInstance) => {
    fastify.post("/", paymentController.createPayment);
    fastify.get("/", paymentController.getAllPayments);
    fastify.get("/:id", paymentController.getPaymentById);
    fastify.put("/:id", paymentController.updatePayment);
    fastify.delete("/:id", paymentController.deletePayment);
};
