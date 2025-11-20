import prismaClient from "../prisma/index.js";
import type { CreateProductDTO } from "../dtos/product/CreateProductDTO.js";
import type { UpdateProductDTO } from "../dtos/product/UpdateProductDTO.js";

export class ProductService {
    async createProduct(productData: CreateProductDTO) {
        return prismaClient.product.create({
            data: productData,
        });
    }

    async getAllProducts(skip: number, take: number) {
        const totalItems = await prismaClient.product.count();

        const products = await prismaClient.product.findMany({
            skip: skip,
            take: take,
        });

        return {
            products,
            meta: {
                totalItems,
                limit: take,
                currentPage: skip / take + 1,
                totalPages: Math.ceil(totalItems / take),
            },
        };
    }

    async getProductById(productId: number) {
        return prismaClient.product.findUnique({
            where: { productId },
        });
    }

    async updateProduct(productId: number, productData: UpdateProductDTO) {
        return prismaClient.product.update({
            where: { productId },
            data: productData,
        });
    }

    async deleteProduct(productId: number) {
        return prismaClient.product.delete({
            where: { productId },
        });
    }
}
