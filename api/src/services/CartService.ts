import prismaClient from "../prisma/index.js";
import type { CreateCartDTO } from "../dtos/cart/CreateCartDTO.js";
import type { UpdateCartDTO } from "../dtos/cart/UpdateCartDTO.js";

export class CartService {
    async createCart(cartData: CreateCartDTO) {
        return prismaClient.cart.create({
            data: cartData,
        });
    }

    async getAllCarts() {
        return prismaClient.cart.findMany();
    }

    async getCartById(cartId: number) {
        return prismaClient.cart.findUnique({
            where: { cartId },
        });
    }

    async updateCart(cartId: number, cartData: UpdateCartDTO) {
        return prismaClient.cart.update({
            where: { cartId },
            data: cartData,
        });
    }

    async deleteCart(cartId: number) {
        return prismaClient.cart.delete({
            where: { cartId },
        });
    }
}
