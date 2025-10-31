import type { FastifyInstance } from "fastify";
import { CartItemController } from "../controllers/CartItemController.js";

const cartItemController = new CartItemController();

export const CartItemRoute = async (fastify: FastifyInstance) => {
    fastify.post("/", cartItemController.createCartItem);
    fastify.get("/", cartItemController.getAllCartItems);
    fastify.get("/:id", cartItemController.getCartItemById);
    fastify.put("/:id", cartItemController.updateCartItem);
    fastify.delete("/:id", cartItemController.deleteCartItem);
};
