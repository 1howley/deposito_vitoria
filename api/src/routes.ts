import type {
    FastifyInstance,
    FastifyPluginOptions,
    FastifyReply,
    FastifyRequest,
} from "fastify";

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
};
