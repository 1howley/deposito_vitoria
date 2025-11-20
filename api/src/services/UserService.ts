import type { CreateUserDTO } from "../dtos/user/CreateUserDTO.js";
import prismaClient from "../prisma/index.js";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;

const JWT_SECRET = process.env.JWT_SECRET || "sua-chave-secreta-padrao-forte";
const JWT_EXPIRES_IN = "1d"; // Expira em 1 dia
export class UserService {
    async createUser(userData: CreateUserDTO) {
        const { email, password, name, authProvider } = userData;

        if (!email) {
            throw new Error("O email é obrigatório.");
        }

        const exisingUser = await prismaClient.user.findUnique({
            where: { email },
        });

        if (exisingUser) {
            throw new Error("Usuário com este email já existe.");
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const userCreated = await prismaClient.user.create({
            data: {
                email: email,
                password: hashedPassword,
                name: name,
                authProvider: authProvider,
            },
        });

        // Omitir a senha no retorno
        const { password: userPassword, ...userWithoutPassword } = userCreated;
        return userWithoutPassword;
    }

    async loginUser(email: string, password: string) {
        const user = await prismaClient.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                name: true,
                password: true,
            },
        });

        if (!user) {
            throw new Error("Credenciais Inválidas");
        }

        const isPasswordvalid = await bcrypt.compare(password, user.password);

        if (!isPasswordvalid) {
            throw new Error("Credenciais Inválidas");
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });

        //Omitir senha no retorno
        const { ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword,
            token: token,
        };
    }

    async getAllUsers(skip: number, take: number) {
        const totalItems = await prismaClient.user.count();

        const users = await prismaClient.user.findMany({
            skip: skip,
            take: take,
            select: {
                id: true,
                email: true,
                name: true,
            },
        });

        return {
            users,
            meta: {
                totalItems,
                limit: take,
                currentPage: skip / take + 1,
                totalPages: Math.ceil(totalItems / take),
            },
        };
    }
}

