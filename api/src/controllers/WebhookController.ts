import type { FastifyReply, FastifyRequest } from "fastify";
import { OrderService } from "../services/OrderService.js";

const orderService = new OrderService();

export class WebhookController {
    handleAbacateWebhook = async (req: FastifyRequest, reply: FastifyReply) => {
        try {
            let payload = req.body as any;

            // --- CORREÇÃO DE DEBUG ---
            // Se o payload chegou como string (comum em alguns testes), convertemos para JSON
            if (typeof payload === 'string') {
                try {
                    payload = JSON.parse(payload);
                } catch (e) {
                    console.error("❌ Erro ao converter payload de texto para JSON:", e);
                    return reply.status(400).send({ error: "JSON inválido" });
                }
            }

            console.log("📦 Payload Processado:", JSON.stringify(payload, null, 2));

            // Tenta capturar o evento (suporta 'event' ou 'type')
            const eventType = payload.event || payload.type;

            if (!eventType) {
                console.warn("⚠️ O payload processado não tem um campo 'event' ou 'type'.");
                return reply.status(400).send({ error: "Formato inválido" });
            }

            console.log("🔔 Evento Identificado:", eventType);

            // Verifica se é evento de pagamento confirmado
            if (eventType === "billing.paid") {
                // Tenta pegar o metadata em diferentes locais comuns
                const metadata = payload.data?.metadata || payload.metadata;
                
                if (metadata && metadata.orderId) {
                    const orderId = Number(metadata.orderId);
                    
                    console.log(`✅ Pagamento confirmado para o Pedido #${orderId}`);
                    
                    await orderService.updateOrderStatus(orderId, "PAID");
                } else {
                    console.warn("⚠️ Webhook recebido sem 'orderId' no metadata.");
                }
            }

            reply.status(200).send({ received: true });
        } catch (error) {
            console.error("❌ Erro no processamento do webhook:", error);
            // Retorna 200 para evitar que o gateway fique reenviando em caso de erro interno nosso
            reply.status(200).send({ error: "Internal processing error" });
        }
    };
}