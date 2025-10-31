import type { FastifyInstance } from "fastify";
import { CartController } from "../controllers/CartController.js";

const cartController = new CartController();

export const CartRoute = async (fastify: FastifyInstance) => {
    fastify.post("/", cartController.createCart);
    fastify.get("/", cartController.getAllCarts);
    fastify.get("/:id", cartController.getCartById);
    fastify.put("/:id", cartController.updateCart);
    fastify.delete("/:id", cartController.deleteCart);
};
