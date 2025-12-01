import type { FastifyRequest, FastifyReply } from "fastify";
import admin from "firebase-admin";
// IMPORTANTE: Ajuste o caminho abaixo para onde você exporta sua instância do Prisma Client
import prismaClient from "../../prisma/index.js";

// =================================================================
// 1. Configuração do Firebase Admin
// =================================================================
// Se você ainda não inicializou o admin em outro lugar (ex: server.ts), 
// descomente e configure abaixo.
const firebaseConfig = {
    apiKey: "AIzaSyBrKoh20iHAFqnLKPxvu3mtC1sZzbIfOEI",
    authDomain: "deposito-vitoria.firebaseapp.com",
    projectId: "deposito-vitoria",
    storageBucket: "deposito-vitoria.firebasestorage.app",
    messagingSenderId: "416473915359",
    appId: "1:416473915359:web:6deb882f99e6520e9fae6a",
    measurementId: "G-BBN9D9W237",
};

if (!admin.apps.length) {
    admin.initializeApp(firebaseConfig);
}


// =================================================================
// 2. Tipagem Personalizada do Fastify
// =================================================================
declare module "fastify" {
    interface FastifyRequest {
        user?: {
            userId: string; // No seu schema é String
            email: string;
            role: "ADMIN" | "CUSTOMER"; // Baseado no seu Enum do Prisma
        };
    }
}

// =================================================================
// 3. Middleware de Autenticação (Verifica Token + Busca User no BD)
// =================================================================
export async function authMiddleware(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return reply.status(401).send({ error: "Token não fornecido." });
    }

    const token = authHeader.split(" ")[1];

    // 3. CORREÇÃO DO ERRO: Verifica se o token realmente existe após o split
    if (!token) {
        return reply.status(401).send({ error: "Token mal formatado." });
    }

    try {
        // A. Valida o token com o Google/Firebase
        const decodedToken = await admin.auth().verifyIdToken(token);
        
        // B. Busca o usuário no seu banco para saber a ROLE
        // Como seu schema usa 'userId String @id', usamos o uid do firebase direto
        const userInDb = await prismaClient.user.findUnique({
            where: { userId: decodedToken.uid }
        });

        // Se o usuário logou no front, mas não existe no seu banco postgres ainda
        if (!userInDb) {
            return reply.status(401).send({ 
                error: "Usuário autenticado, mas não cadastrado no sistema." 
            });
        }

        // C. Anexa os dados reais do banco na requisição
        request.user = {
            userId: userInDb.userId,
            email: userInDb.email,
            role: userInDb.role // Aqui vem 'ADMIN' ou 'CUSTOMER'
        };

    } catch (err) {
        // console.error(err); // Descomente para debug
        return reply.status(401).send({ error: "Token inválido ou expirado." });
    }
}