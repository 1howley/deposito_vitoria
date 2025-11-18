import type { FastifyReply, FastifyRequest } from "fastify";
import { CreateProductSchema, CreateProductDTO } from "../dtos/product/CreateProductDTO.js";
import {z} from "zod";
import { UpdateProductSchema, UpdateProductDTO } from "../dtos/product/UpdateProductDTO.js";
import { PaginationSchema, PaginationDTO } from "../dtos/product/PaginationDTO.js";

const productService = new ProductService();

export class ProductController {
    async createProduct(req: FastifyRequest, reply: FastifyReply) {
        try {
            const validationResult = CreateProductSchema.safeParse(request.body);

            if(!validationResult.success){
                return reply.status(400).send({
                    error: "Erro de Validação.",
                    details: validationResult.error.issues,
                });
            }

            const productValidatedData: CreateProductDTO = validationResult.data;

            const newProduct = await this.productService.createProduct(productValidatedData);
            
            reply.status(201).send(newProduct);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async getAllProducts(req: FastifyRequest, reply: FastifyReply) {
        try {
            const validationResult = PaginationSchema.safeParse(request.body);

            if(!validationResult.success){
                return reply.status(400).send({
                    error: "Parâmetros de paginação inválidos.",
                    details: validationResult.error.issues,
                });
            }

            const {page, limit} = validationResult.data;
            const skip = (page - 1) * limit;
            const result = await this.productService.getAllProducts(skip, limit);

            reply.code(200).send(result);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async getProductById(
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        const IdSchema = z.object({
        id: z.string().transform((val) => parseInt(val, 10)).pipe(z.number().int().positive("O ID deve ser um número inteiro positivo.")),
        });
        try {
            const paramsValidated = IdSchema.safeParse(req.params);

            if (!paramsValidated.success) {
                return reply.status(400).send({ error: "ID de produto inválido." });
            }

            const productId = paramsValidated.data.id;

            const product = await productService.getProductById(productId);

            if (product) {
                reply.status(200).send(product);
            } else {
                reply.status(404).send({ message: "Product not found" });
            }
            } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async updateProduct(
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        const IdSchema = z.object({
            id: z.string().transform((val) => parseInt(val, 10)).pipe(z.number().int().positive("O ID deve ser um número inteiro positivo.")),
        });

        try {
            const paramsValidated = IdSchema.safeParse(req.params);

            const bodyValidatedResult = UpdateProductSchema.safeParse(req.body);

            if(!paramsValidated.success){
                return reply.status(400).send({ 
                    error: "ID de produto inválido (parâmetro de rota).",
                    details: paramsValidated.error.issues,
                });
            }

            if (!bodyValidatedResult.success) {
                return reply.status(400).send({ 
                    error: "Dados de atualização inválidos.",
                    details: bodyValidatedResult.error.issues,
                });
            }

            const productId = paramsValidated.data.id;

            const updateProductData: UpdateProductDTO = bodyValidatedResult.data;

            const product = await productService.updateProduct(
                productId,
                updateProductData
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
        const IdSchema = z.object({
            id: z.string().transform((val) => parseInt(val, 10)).pipe(z.number().int(). positive("O ID deve ser um número inteiro positivo.")),
        });
        try {
            const paramsValidated = IdSchema.safeParse(req.params);

            if(!paramsValidated.success){
                return reply.status(400).send({
                    error: "ID de produto inválido para exclusão.",
                    details: paramsValidated.error.issues,
                });

            }

            const productId = paramsValidated.data.id;
            await productService.deleteProduct(productId);

            reply.status(204).send();
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }
}
