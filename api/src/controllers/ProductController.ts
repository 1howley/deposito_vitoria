import type { FastifyReply, FastifyRequest } from "fastify";
import { CreateProductSchema, type CreateProductDTO } from "../dtos/product/CreateProductDTO.js";
import { UpdateProductSchema } from "../dtos/product/UpdateProductDTO.js"; // Certifique-se que o import está correto
import { SearchPaginationSchema } from "../dtos/product/PaginationDTO.js";
import { ProductService } from "../services/ProductService.js";

export class ProductController {
    private productService = new ProductService();

    // Arrow function para garantir o 'this'
    createProduct = async (req: FastifyRequest, reply: FastifyReply) => {
        try {
            const validationResult = CreateProductSchema.safeParse(req.body);
            if (!validationResult.success) {
                return reply.status(400).send({
                    error: "Erro de Validação.",
                    details: validationResult.error.issues,
                });
            }
            const newProduct = await this.productService.createProduct(validationResult.data);
            reply.status(201).send(newProduct);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    };

    getAllProducts = async (req: FastifyRequest, reply: FastifyReply) => {
        try {
            const validationResult = SearchPaginationSchema.safeParse(req.query);
            if (!validationResult.success) {
                return reply.status(400).send({ error: "Parâmetros inválidos." });
            }
            const { page, limit } = validationResult.data;
            const skip = (page - 1) * limit;
            const result = await this.productService.getAllProducts(skip, limit);
            reply.code(200).send(result);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    };

    getProductById = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        try {
            const id = parseInt(req.params.id, 10);
            const product = await this.productService.getProductById(id);
            if (product) reply.status(200).send(product);
            else reply.status(404).send({ message: "Product not found" });
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    };

    updateProduct = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        try {
            const id = parseInt(req.params.id, 10);
            const validationResult = UpdateProductSchema.safeParse(req.body);

            if (!validationResult.success) {
                return reply.status(400).send({ error: "Dados inválidos", details: validationResult.error.issues });
            }

            const updatedProduct = await this.productService.updateProduct(id, validationResult.data);
            reply.code(200).send(updatedProduct);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    };

    deleteProduct = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        try {
            const id = parseInt(req.params.id, 10);
            await this.productService.deleteProduct(id);
            reply.code(204).send();
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    };
}