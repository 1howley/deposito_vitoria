import type { FastifyInstance } from "fastify";
import { ProductController } from "../controllers/ProductController.js";
import { authMiddleware } from "../common/middlewares/authMiddleware.js";
import { adminOnlyMiddleware } from "../common/middlewares/adminOnlyMiddleware.js";

const productController = new ProductController();

export async function ProductRoute(app: FastifyInstance) {
    app.get("/", productController.getAllProducts);
    app.get("/:id", productController.getProductById);

    app.post(
        "/",
        { preHandler: [authMiddleware, adminOnlyMiddleware] },
        productController.createProduct
    );

    app.put(
        "/:id",
        { preHandler: [authMiddleware, adminOnlyMiddleware] },
        productController.updateProduct
    );

    app.delete(
        "/:id",
        { preHandler: [authMiddleware, adminOnlyMiddleware] },
        productController.deleteProduct
    );
}
