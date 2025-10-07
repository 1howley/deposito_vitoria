import type {
    FastifyInstance,
    FastifyPluginOptions,
    FastifyReply,
    FastifyRequest,
} from "fastify";
import { UserController } from "../controllers/UserController.js"

export const UserRoute = async (
    fastify: FastifyInstance,
    options: FastifyPluginOptions
) => {
    const userController = new UserController();

    fastify.get(
        "/",
        async (request: FastifyRequest, reply: FastifyReply) => {
            return userController.listAllUsers(request, reply);
        }
    );

    fastify.post(
        "/",
        async (request: FastifyRequest, reply: FastifyReply) => {
            return userController.createUser(request, reply);
        }
    );
};
