import type { CreateUserDTO } from "../dtos/user/CreateUserDTO.js";
import prismaClient from "../prisma/index.js";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client"; // Importando o Enum do Prisma

const JWT_SECRET = process.env.JWT_SECRET || "sua-chave-secreta-padrao-forte";
const JWT_EXPIRES_IN = "1d";

// Lista de e-mails que serão ADMIN automaticamente
const ADMIN_EMAILS = [
    "bielgabrielfs61@gmail.com",
    "celiohenrique3434@gmail.com"
];

export class UserService {
    async createUser(userData: CreateUserDTO) {
        const { userId, email, name, authProvider } = userData;

        if (!email) {
            throw new Error("O email é obrigatório.");
        }

        const existingUser = await prismaClient.user.findUnique({
            where: { userId },
        });

        if (existingUser) {
            // Se o usuário já existe, retornamos ele (idempotência para login social)
            const { ...userWithoutPassword } = existingUser;
            return userWithoutPassword;
        }

        // LÓGICA DE ROLE: Se o email estiver na lista, é ADMIN, senão CUSTOMER
        const role = ADMIN_EMAILS.includes(email) ? Role.ADMIN : Role.CUSTOMER;

        const userCreated = await prismaClient.user.create({
            data: {
                userId,
                email,
                name: name || null,
                role: role, // Forçamos a role aqui
                authProvider,
            },
        });

        const { ...userWithoutPassword } = userCreated;
        return userWithoutPassword;
    }

    async loginUser(email: string, password: string) {
        // ... (Mantenha o código de login existente se houver, ou a busca por UID)
        // Como estamos usando Firebase, o login principal é via Token no frontend
        // Mas se tiver login por senha legada, mantenha aqui.
        // Vou manter a busca simples que já existia para não quebrar nada:
        const user = await prismaClient.user.findUnique({
            where: { email },
        });

        if (!user) throw new Error("Usuário não encontrado");

        const token = jwt.sign({ userId: user.userId }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });

        return { user, token };
    }

    async getAllUsers(skip: number, take: number) {
        const totalItems = await prismaClient.user.count();
        const users = await prismaClient.user.findMany({
            skip,
            take,
            select: { userId: true, email: true, role: true, name: true },
        });

        return {
            users,
            meta: {
                totalItems,
                limit: take,
                currentPage: Math.floor(skip / take) + 1,
                totalPages: Math.ceil(totalItems / take),
            },
        };
    }

    async findUserByUid(uid: string) {
        return prismaClient.user.findUnique({
            where: { userId: uid },
        });
    }
}