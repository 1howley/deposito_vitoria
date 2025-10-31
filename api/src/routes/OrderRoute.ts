import type { FastifyInstance } from "fastify";
import { OrderController } from "../controllers/OrderController.js";

const orderController = new OrderController();

export const OrderRoute = async (fastify: FastifyInstance) => {
    fastify.post("/", orderController.createOrder);
    fastify.get("/", orderController.getAllOrders);
    fastify.get("/:id", orderController.getOrderById);
    fastify.put("/:id", orderController.updateOrder);
    fastify.delete("/:id", orderController.deleteOrder);
};
