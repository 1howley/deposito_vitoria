import type {FastifyRequest, FastifyReply} from "fastify"

export async function adminOnlyMiddleware(request: FastifyRequest, reply: FastifyReply){
    if(!request.user || request.user.role !== "ADIMIN"){
        return reply.status(403).send({error: "Acesso negado. Requer permissão de Administrador"});
    }
}