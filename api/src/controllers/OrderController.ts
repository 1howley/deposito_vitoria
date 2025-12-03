import type { FastifyReply, FastifyRequest } from "fastify";
import { OrderService } from "../services/OrderService.js";
import prismaClient from "../prisma/index.js";
import { SearchPaginationSchema } from "../dtos/product/PaginationDTO.js";
import type { CreateOrderDTO } from "../dtos/order/CreateOrderDTO.js";
import type { Prisma } from "@prisma/client";

// Interface para Request autenticado
interface AuthenticatedRequest extends FastifyRequest {
    user?: {
        userId: string;
        email: string;
        role: "ADMIN" | "CUSTOMER";
    }
}

export class OrderController {
    private orderService = new OrderService();

    // ============================================================
    // CORREÇÃO: Todos os métodos agora são Arrow Functions (= async () => {})
    // Isso garante que 'this.orderService' esteja sempre disponível.
    // ============================================================

    createOrder = async (req: AuthenticatedRequest, reply: FastifyReply) => {
        try {
            const userId = req.user?.userId;

            if (!userId) {
                return reply.code(401).send({ message: "Usuário não autenticado." });
            }

            const orderData = req.body as CreateOrderDTO;
            const order = await this.orderService.createOrder(userId, orderData);

            reply.code(201).send(order);
        } catch (error: any) {
            // Verifica erros de negócio para retornar 400 em vez de 500
            const isLogicError = error.message.includes("Estoque") || error.message.includes("carrinho");
            reply.code(isLogicError ? 400 : 500).send({ message: error.message });
        }
    };

    // Método auxiliar para listar pedidos de um usuário específico
    // (Pode ser movido para o Service futuramente, mas mantemos aqui para não quebrar a lógica anterior)
    listUserOrders = async (userId: string) => {
        return prismaClient.order.findMany({
            where: { clientId: userId },
            orderBy: { createdAt: "desc" },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
    };

    listMyOrders = async (req: AuthenticatedRequest, reply: FastifyReply) => {
        try {
            const userId = req.user?.userId;
            
            if (!userId) {
                return reply.code(401).send({ message: "Usuário não autenticado." });
            }

            const orders = await this.listUserOrders(userId);
            
            reply.code(200).send(orders);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    };

    getAllOrders = async (req: FastifyRequest, reply: FastifyReply) => {
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
            
            // AQUI OCORRIA O ERRO: 'this.orderService' era undefined
            const result = await this.orderService.getAllOrders(skip, limit);

            reply.status(200).send(result);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    };

    getOrderById = async (
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) => {
        try {
            const orderId = parseInt(req.params.id, 10);
            const order = await this.orderService.getOrderById(orderId);
            if (order) {
                reply.code(200).send(order);
            } else {
                reply.code(404).send({ message: "Order not found" });
            }
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    };

    // Este método atende tanto updates gerais quanto atualização de status
    updateOrder = async (
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) => {
        try {
            const orderId = parseInt(req.params.id, 10);
            const updateData = req.body as Prisma.OrderUpdateInput;
            
            // Se for apenas status, podemos usar a lógica específica do service se preferir,
            // mas o updateOrder genérico do service já deve lidar com isso.
            // Se você tiver uma lógica especial para status (como restaurar estoque ao cancelar),
            // verifique se o Service trata isso ou chame updateOrderStatus aqui.
            
            let order;
            // Se o payload tiver 'status', usamos o método específico que trata estoque
            if (req.body && (req.body as any).status) {
                 const status = (req.body as any).status;
                 order = await this.orderService.updateOrderStatus(orderId, status);
            } else {
                 order = await this.orderService.updateOrder(orderId, updateData);
            }

            reply.code(200).send(order);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    };

    deleteOrder = async (
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) => {
        try {
            await this.orderService.deleteOrder(parseInt(req.params.id, 10));
            reply.code(204).send();
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    };
}