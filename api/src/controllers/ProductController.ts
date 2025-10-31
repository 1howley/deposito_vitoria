import type { FastifyReply, FastifyRequest } from "fastify";
import { ProductService } from "../services/ProductService.js";

const productService = new ProductService();

export class ProductController {
    async createProduct(req: FastifyRequest, reply: FastifyReply) {
        try {
            const product = await productService.createProduct(req.body as any);
            reply.code(201).send(product);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async getAllProducts(req: FastifyRequest, reply: FastifyReply) {
        try {
            const products = await productService.getAllProducts();
            reply.code(200).send(products);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async getProductById(
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const product = await productService.getProductById(
                parseInt(req.params.id, 10)
            );
            if (product) {
                reply.code(200).send(product);
            } else {
                reply.code(404).send({ message: "Product not found" });
            }
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async updateProduct(
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const product = await productService.updateProduct(
                parseInt(req.params.id, 10),
                req.body as any
            );
            reply.code(200).send(product);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async deleteProduct(
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            await productService.deleteProduct(parseInt(req.params.id, 10));
            reply.code(204).send();
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }
}
