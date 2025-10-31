import type { FastifyInstance } from "fastify";
import { AddressController } from "../controllers/AddressController.js";

const addressController = new AddressController();

export const AddressRoute = async (fastify: FastifyInstance) => {
    fastify.post("/", addressController.createAddress);
    fastify.get("/", addressController.getAllAddresses);
    fastify.get("/:id", addressController.getAddressById);
    fastify.put("/:id", addressController.updateAddress);
    fastify.delete("/:id", addressController.deleteAddress);
};
