import type { FastifyReply, FastifyRequest } from "fastify";
import { CartItemService } from "../services/CartItemService.js";

const cartItemService = new CartItemService();

export class CartItemController {
    async createCartItem(req: FastifyRequest, reply: FastifyReply) {
        try {
            const cartItem = await cartItemService.createCartItem(
                req.body as any
            );
            reply.code(201).send(cartItem);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async getAllCartItems(req: FastifyRequest, reply: FastifyReply) {
        try {
            const cartItems = await cartItemService.getAllCartItems();
            reply.code(200).send(cartItems);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async getCartItemById(
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const cartItem = await cartItemService.getCartItemById(
                parseInt(req.params.id, 10)
            );
            if (cartItem) {
                reply.code(200).send(cartItem);
            } else {
                reply.code(404).send({ message: "CartItem not found" });
            }
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async updateCartItem(
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const cartItem = await cartItemService.updateCartItem(
                parseInt(req.params.id, 10),
                req.body as any
            );
            reply.code(200).send(cartItem);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async deleteCartItem(
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            await cartItemService.deleteCartItem(parseInt(req.params.id, 10));
            reply.code(204).send();
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }
}
