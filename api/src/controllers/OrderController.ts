import type { FastifyReply, FastifyRequest } from "fastify";
import { OrderService } from "../services/OrderService.js";
import prismaClient from "../prisma/index.js";
import {
    SearchPaginationSchema,
} from "../dtos/product/PaginationDTO.js";
import type { CreateOrderDTO } from "../dtos/order/CreateOrderDTO.js";

// CORREÇÃO 1: Ajustando a interface para bater com o erro do Fastify/JWT
// O erro dizia que faltava userId e email.
interface AuthenticatedRequest extends FastifyRequest {
    user: {
        userId: string;
        email: string;
        role: "ADMIN" | "CUSTOMER";
    }
}

export class OrderController {
    private orderService = new OrderService();

    async createOrder(req: AuthenticatedRequest, reply: FastifyReply) {
        try {
            // CORREÇÃO: Pegando userId da tipagem correta
            const userId = req.user?.userId;

            if (!userId) {
                return reply
                    .code(401)
                    .send({
                        message: "Usuário não autenticado. O Middleware falhou",
                    });
            }

            // CORREÇÃO: Usando o DTO novo que criamos para o checkout
            const orderData = req.body as CreateOrderDTO;

            const order = await this.orderService.createOrder(userId, orderData);

            reply.code(201).send(order);
        } catch (error: any) {
            const isLogicError =
                error.message.includes("Estoque") ||
                error.message.includes("carrinho");
            const statusCode = isLogicError ? 400 : 500;

            reply.code(statusCode).send({ message: error.message });
        }
    }

    async listUserOrders(userId: string) { // Mudado para string conforme schema
        return prismaClient.order.findMany({
            where: { 
                // CORREÇÃO 2: No seu schema o campo é 'clientId', não 'userId'
                clientId: userId 
            },
            orderBy: { createdAt: "desc" },
            include: {
                // CORREÇÃO 3: No seu schema a relação é 'items', não 'OrderItem'
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
    }

    async listMyOrders(req: AuthenticatedRequest, reply: FastifyReply) {
        try {
            const userId = req.user?.userId;
            
            if (!userId) {
                return reply.code(401).send({ message: "Usuário não autenticado." });
            }

            // Reutilizando a lógica corrigida acima
            const orders = await this.listUserOrders(userId);
            
            reply.code(200).send(orders);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async getAllOrders(req: AuthenticatedRequest, reply: FastifyReply) {
        try {
            const validationResult = SearchPaginationSchema.safeParse(req.query);

            if (!validationResult.success) {
                return reply.status(400).send({
                    error: "Parâmetros de paginação inválidos.",
                    details: validationResult.error.issues,
                });
            }

            const { page, limit } = validationResult.data;
            const skip = (page - 1) * limit;
            const result = await this.orderService.getAllOrders(skip, limit);

            reply.status(200).send(result);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async getOrderById(
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const order = await this.orderService.getOrderById(
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

    async updateStatus(
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const orderId = parseInt(req.params.id, 10);
            const { status } = req.body as { status: string };
            const updatedOrder = await this.orderService.updateOrderStatus(
                orderId,
                status
            );

            reply.code(200).send(updatedOrder);
        } catch (error: any) {
            const statusCode = error.message.incluides("not found") ? 400 : 500;
            reply.code(statusCode).send({ message: error.message });
        }
    }

    async updateOrder(
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const order = await this.orderService.updateOrder(
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
            await this.orderService.deleteOrder(parseInt(req.params.id, 10));
            reply.code(204).send();
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }
}
