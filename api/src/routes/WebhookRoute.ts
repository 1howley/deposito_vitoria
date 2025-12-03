import type { FastifyInstance } from "fastify";
import { WebhookController } from "../controllers/WebhookController.js";

const webhookController = new WebhookController();

export const WebhookRoute = async (fastify: FastifyInstance) => {
    // Rota pública para a AbacatePay chamar
    fastify.post("/abacatepay", webhookController.handleAbacateWebhook);
};