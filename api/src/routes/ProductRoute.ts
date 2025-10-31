import type { FastifyInstance } from "fastify";
import { ProductController } from "../controllers/ProductController.js";

const productController = new ProductController();

export const ProductRoute = async (fastify: FastifyInstance) => {
    fastify.post("/", productController.createProduct);
    fastify.get("/", productController.getAllProducts);
    fastify.get("/:id", productController.getProductById);
    fastify.put("/:id", productController.updateProduct);
    fastify.delete("/:id", productController.deleteProduct);
};
