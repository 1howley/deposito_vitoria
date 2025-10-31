import type { CreateUserDTO } from "../dtos/user/CreateUserDTO.js";
import prismaClient from "../prisma/index.js";

class UserService {
    async createUser(user: CreateUserDTO) {
        const { userId, email, name, role } = user;

        if (!email) {
            throw new Error("> email is empty");
        }

        const userCreated = await prismaClient.user.create({
            data: {
                userId,
                email,
                name: name ?? null,
                role: role ?? "CUSTOMER",
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
