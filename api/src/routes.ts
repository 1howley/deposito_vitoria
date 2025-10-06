import type {
    FastifyInstance,
    FastifyPluginOptions,
    FastifyReply,
    FastifyRequest,
} from "fastify";
import { UserController } from "./controllers/userController.js";

export const routes = async (
    fastify: FastifyInstance,
    options: FastifyPluginOptions
) => {
    fastify.get(
        "/hello-world",
        async (request: FastifyRequest, reply: FastifyReply) => {
            return {
                hello: "world",
                ok: true,
            };
        }
    );

    fastify.post("/users", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UserController().CreateUser(request, reply);
    })
};
