import prismaClient from "../prisma/index.js";
import type { CreateAddressDTO } from "../dtos/address/CreateAddressDTO.js";
import type { UpdateAddressDTO } from "../dtos/address/UpdateAddressDTO.js";

export class AddressService {
    async createAddress(addressData: CreateAddressDTO) {
        return prismaClient.address.create({
            data: addressData,
        });
    }

    async getAllAddresses() {
        return prismaClient.address.findMany();
    }

    async getAddressById(addressId: number) {
        return prismaClient.address.findUnique({
            where: { addressId },
        });
    }

    async updateAddress(addressId: number, addressData: UpdateAddressDTO) {
        return prismaClient.address.update({
            where: { addressId },
            data: addressData,
        });
    }

    async deleteAddress(addressId: number) {
        return prismaClient.address.delete({
            where: { addressId },
        });
    }
}
