import type { FastifyInstance } from "fastify";
import { ProductController } from "../controllers/ProductController.js";
import { authMiddleware } from "../common/middlewares/authMiddleware.js";
import { adminOnlyMiddleware } from "../common/middlewares/adminOnlyMiddleware.js";

const productController = new ProductController();

export async function ProductRoute(app: FastifyInstance) {
    app.get("/products", productController.getAllProducts);
    app.get("/products/:id", productController.getProductById);

    app.post(
        "/products",
        { preHandler: [authMiddleware, adminOnlyMiddleware] },
        productController.createProduct
    );

    app.put(
        "/products/:id",
        { preHandler: [authMiddleware, adminOnlyMiddleware] },
        productController.updateProduct
    );

    app.delete(
        "/products/:id",
        { preHandler: [authMiddleware, adminOnlyMiddleware] },
        productController.deleteProduct
    );
}
