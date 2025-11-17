import type { FastifyInstance } from "fastify";
import { OrderController } from "../controllers/OrderController.js";

import { authMiddleware } from "../common/middlewares/authMiddleware.js";
import { adminOnlyMiddleware } from "../common/middlewares/adminOnlyMiddleware.js"

const orderController = new OrderController();

export const OrderRoute = async (fastify: FastifyInstance) => {
    fastify.post("/", orderController.createOrder);
    fastify.get("/", { preHandler: [authMiddleware] }, orderController.listMyOrders); 
    fastify.get("/all", { preHandler: [authMiddleware, adminOnlyMiddleware] }, orderController.getAllOrders);
    fastify.put("/:id", orderController.updateOrder);
    fastify.delete("/:id", orderController.deleteOrder);
};
