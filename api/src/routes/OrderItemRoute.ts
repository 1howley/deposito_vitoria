import type { FastifyInstance } from "fastify";
import { OrderItemController } from "../controllers/OrderItemController.js";

const orderItemController = new OrderItemController();

export const OrderItemRoute = async (fastify: FastifyInstance) => {
    fastify.post("/", orderItemController.createOrderItem);
    fastify.get("/", orderItemController.getAllOrderItems);
    fastify.get("/:id", orderItemController.getOrderItemById);
    fastify.put("/:id", orderItemController.updateOrderItem);
    fastify.delete("/:id", orderItemController.deleteOrderItem);
};
