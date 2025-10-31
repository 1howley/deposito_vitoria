import prismaClient from "../prisma/index.js";
import type { CreateProductDTO } from "../dtos/product/CreateProductDTO.js";
import type { UpdateProductDTO } from "../dtos/product/UpdateProductDTO.js";

export class ProductService {
    async createProduct(productData: CreateProductDTO) {
        return prismaClient.product.create({
            data: productData,
        });
    }

    async getAllProducts() {
        return prismaClient.product.findMany();
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
