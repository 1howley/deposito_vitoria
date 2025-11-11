import type { FastifyReply, FastifyRequest } from "fastify";
import { OrderService } from "../services/OrderService.js";
import prismaClient from "../prisma/index.js";

const orderService = new OrderService();

interface AuthenticatedRequest extends FastifyRequest{
    user?: {id:number; role: string};
}

export class OrderController {
    async createOrder(req: AuthenticatedRequest, reply: FastifyReply) {
        try {
            const userId = req.user?.id;
            
            if(!userId){
                return reply.code(401).send({message: "Usuario não autentificado. o Middleware falhou"});
            }

            const orderData = req.body as any;

            const order = await orderService.createOrder(userId, orderData);

            reply.code(201).send(order);
        }catch(error: any){
            const isLogicError = error.message.includes("Estoque") || error.message.includes("carrinho");
            const statusCode = isLogicError ? 400: 500;

            reply.code(statusCode).send({message: error.message});
        }
    }

    async listUserOrders(userId: number){
        return prismaClient.order.findMany({
            where: {userId},
            orderBy: {createdAt: "desc"},
            include: {
                OrderItem:{
                    include:{
                        product: True,
                    }
                }
            }
        });
    } 

    async listMyOrders(req: AuthenticatedRequest, reply: FastifyReply){
        try{
            const userId = req.user?.id;
            if(!userId){
                return reply.code(401).send({message: error.message});
            }
        }catch (error: any){
            reply.code(500).send({message: error.message});
        }
    }

    async getAllOrders(req: AuthenticatedRequest, reply: FastifyReply) {
        try {
            const orders = await orderService.getAllOrders();
            reply.code(200).send(orders);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async getOrderById(
        req: AuthenticatedRequest<{ Params: { id: string } }>,
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

    async updateStatus(req: FastifyRequest<{ Params: {id:string}}>, reply: FastifyReply){
        try{
            const orderId = parseInt(req.params.id, 10);
            const {status} = req.body as {status: string};
            const updatedOrder = await orderService.updateOrderStatus(orderId, status);

            reply.code(200).send(updatedOrder);
        }catch(error: any){
            const statusCode = error.message.incluides("not found") ? 400:500;
            reply.code(statusCode).send({message: error.message});
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
