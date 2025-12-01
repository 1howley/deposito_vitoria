import type { FastifyReply, FastifyRequest } from "fastify";

export async function adminOnlyMiddleware(
    request: FastifyRequest,
    reply: FastifyReply
) {
    // Este middleware deve rodar DEPOIS do authMiddleware
    if (!request.user) {
        return reply.status(401).send({ error: "Usuário não autenticado." });
    }

    if (request.user.role !== "ADMIN") {
        return reply.status(403).send({
            error: "Acesso negado. Requer permissão de Administrador.",
        });
    }
}