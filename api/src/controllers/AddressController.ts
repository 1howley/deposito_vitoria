import type { FastifyReply, FastifyRequest } from "fastify";
import { AddressService } from "../services/AddressService.js";

const addressService = new AddressService();

export class AddressController {
    async createAddress(req: FastifyRequest, reply: FastifyReply) {
        try {
            const address = await addressService.createAddress(req.body as any);
            reply.code(201).send(address);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async getAllAddresses(req: FastifyRequest, reply: FastifyReply) {
        try {
            const addresses = await addressService.getAllAddresses();
            reply.code(200).send(addresses);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async getAddressById(
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const address = await addressService.getAddressById(
                parseInt(req.params.id, 10)
            );
            if (address) {
                reply.code(200).send(address);
            } else {
                reply.code(404).send({ message: "Address not found" });
            }
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async updateAddress(
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const address = await addressService.updateAddress(
                parseInt(req.params.id, 10),
                req.body as any
            );
            reply.code(200).send(address);
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }

    async deleteAddress(
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            await addressService.deleteAddress(parseInt(req.params.id, 10));
            reply.code(204).send();
        } catch (error: any) {
            reply.code(500).send({ message: error.message });
        }
    }
}
