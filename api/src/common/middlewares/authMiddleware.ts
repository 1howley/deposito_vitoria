import type { FastifyRequest, FastifyReply } from "fastify";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "sua_chave_secreta_padrao_muito_fraca";

declare module "fastify"{
    interface FastifyRequest{
        user?: {id: number, role: string};
    }
}

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply){

    const authHeader = request.header.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")){
        return reply.status(401).send({error: "Token não fornecido."});
    }

    const token = authHeader.slipt('')[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET) as {id: number, role:string};
        request.user = {
            id: decoded.id,
            role: decoded.role
        };
    }catch(err){
        return reply.status(401).send({error: "Token inválido ou expirado."});
    }
}