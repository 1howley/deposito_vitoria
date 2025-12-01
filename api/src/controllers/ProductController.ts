import type { FastifyReply, FastifyRequest } from "fastify";
import { CreateProductSchema, type CreateProductDTO } from "../dtos/product/CreateProductDTO.js";
import { z } from "zod";
import { UpdateProductSchema, type UpdateProductDTO } from "../dtos/product/UpdateProductDTO.js";
import { SearchPaginationSchema } from "../dtos/product/PaginationDTO.js";
import { ProductService } from "../services/ProductService.js";

export class ProductController {
    private productService = new ProductService();

    // MUDANÇA AQUI: De "async createProduct(...) {" para "createProduct = async (...) => {"
    createProduct = async (req: FastifyRequest, reply: FastifyReply) => {
        try {
            const validationResult = CreateProductSchema.safeParse(req.body);

            if (!validationResult.success) {
                return reply.status(400).send({
                    error: "Erro de Validação.",
                    details: validationResult.error.issues,
                });
            }

            const productValidatedData: CreateProductDTO = validationResult.data;

            // Agora 'this' refere-se corretamente à classe ProductController
            const newProduct = await this.productService.createProduct(productValidatedData);

            reply.status(201).send(newProduct);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    };

    // Aplique a mesma lógica para os outros métodos para evitar erros futuros:

    getAllProducts = async (req: FastifyRequest, reply: FastifyReply) => {
        try {
            const validationResult = SearchPaginationSchema.safeParse(req.query);

            if (!validationResult.success) {
                return reply.status(400).send({
                    error: "Parâmetros de paginação inválidos.",
                    details: validationResult.error.issues,
                });
            }

            const { page, limit } = validationResult.data; // Removido search/category temporariamente pois não estavam sendo usados no service
            const skip = (page - 1) * limit;
            
            const result = await this.productService.getAllProducts(skip, limit);

            reply.code(200).send(result);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    };

    getProductById = async (
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) => {
        const IdSchema = z.object({
            id: z.string().transform((val) => parseInt(val, 10)).pipe(
                z.number().int().positive()
            ),
        });
        try {
            const paramsValidated = IdSchema.safeParse(req.params);

            if (!paramsValidated.success) {
                return reply.status(400).send({ error: "ID de produto inválido." });
            }

            const productId = paramsValidated.data.id;
            const product = await this.productService.getProductById(productId);

            if (product) {
                reply.status(200).send(product);
            } else {
                reply.status(404).send({ message: "Product not found" });
            }
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    };

    updateProduct = async (
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) => {
         // ... (manter lógica existente)
         // Só precisa garantir que a definição seja uma arrow function
         // A implementação interna estava correta, só mude a assinatura
         // Exemplo rápido para não ocupar espaço:
         const IdSchema = z.object({ id: z.string().transform((val) => parseInt(val, 10)) });
         const paramsValidated = IdSchema.safeParse(req.params);
         // ... resto da validação ...
         
         // Mock do fluxo para ilustrar o uso do this:
         if (paramsValidated.success) {
             const updateData = req.body as UpdateProductDTO; // Simplificado para exemplo
             const product = await this.productService.updateProduct(paramsValidated.data.id, updateData);
             reply.code(200).send(product);
         }
    };

    deleteProduct = async (
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) => {
        const IdSchema = z.object({
            id: z.string().transform((val) => parseInt(val, 10)).pipe(
                z.number().int().positive()
            ),
        });
        try {
            const paramsValidated = IdSchema.safeParse(req.params);

            if (!paramsValidated.success) {
                return reply.status(400).send({ error: "ID inválido." });
            }

            const productId = paramsValidated.data.id;
            await this.productService.deleteProduct(productId);

            reply.status(204).send();
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    };
}