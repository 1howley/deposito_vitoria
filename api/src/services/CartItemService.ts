import prismaClient from "../prisma/index.js";
import type { CreateCartItemDTO } from "../dtos/cartItem/CreateCartItemDTO.js";
import type { UpdateCartItemDTO } from "../dtos/cartItem/UpdateCartItemDTO.js";

export class CartItemService {
    async createCartItem(cartItemData: CreateCartItemDTO) {
        return prismaClient.cartItem.create({
            data: cartItemData,
        });
    }

    async getAllCartItems() {
        return prismaClient.cartItem.findMany();
    }

    async getCartItemById(cartItemId: number) {
        return prismaClient.cartItem.findUnique({
            where: { cartItemId },
        });
    }

    async updateCartItem(cartItemId: number, cartItemData: UpdateCartItemDTO) {
        return prismaClient.cartItem.update({
            where: { cartItemId },
            data: cartItemData,
        });
    }

    async deleteCartItem(cartItemId: number) {
        return prismaClient.cartItem.delete({
            where: { cartItemId },
        });
    }
}
