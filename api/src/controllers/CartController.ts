import type { FastifyReply, FastifyRequest } from "fastify";
import { CartService } from "../services/CartService.js";

const cartService = new CartService();

export class CartController {
    async createCart(req: FastifyRequest, reply: FastifyReply) {
        try {
            const cart = await cartService.createCart(req.body as any);
            reply.code(201).send(cart);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async getAllCarts(req: FastifyRequest, reply: FastifyReply) {
        try {
            const carts = await cartService.getAllCarts();
            reply.code(200).send(carts);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async getCartById(
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const cart = await cartService.getCartById(
                parseInt(req.params.id, 10)
            );
            if (cart) {
                reply.code(200).send(cart);
            } else {
                reply.code(404).send({ message: "Cart not found" });
            }
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async updateCart(
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const cart = await cartService.updateCart(
                parseInt(req.params.id, 10),
                req.body as any
            );
            reply.code(200).send(cart);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async deleteCart(
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            await cartService.deleteCart(parseInt(req.params.id, 10));
            reply.code(204).send();
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }
}
