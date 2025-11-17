import type { CreateUserDTO } from "../dtos/user/CreateUserDTO.js";
import prismaClient from "../prisma/index.js";

class UserService {
    async createUser(user: CreateUserDTO) {
        const { userId, email, name, role, authProvider } = user;

        if (!email) {
            throw new Error("> email is empty");
        }

        const userCreated = await prismaClient.user.upsert({
            where: {
                userId: userId,
            },

            // 2. O que fazer se o usuário JÁ EXISTIR (Login)
            update: {
                name: name, // Atualiza o nome, caso tenha mudado (ex: no Google)
                authProvider: authProvider,
                // Você poderia adicionar: lastLogin: new Date()
            },

            // 3. O que fazer se o usuário NÃO EXISTIR (Cadastro)
            create: {
                userId: userId,
                email: email,
                name: name,
                authProvider: authProvider,
                // 'role' usará o valor default do seu schema
            },
        });

        return userCreated;
    }

    async getAllUsers() {
        const users = await prismaClient.user.findMany();
        return users;
    }
}

export { UserService };
