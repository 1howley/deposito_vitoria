import type { CreateUserDTO } from "../dtos/user/CreateUserDTO.js";
import prismaClient from "../prisma/index.js";

class UserService {
    async createUser(user: CreateUserDTO) {

        const { email, password, name, role } = user;

        if (!email) {
            throw new Error("> email is empty");
        }

        const userCreated = await prismaClient.user.create({
            data: {
                email,
                password,
                name: name || "",
                role
            }
        })

        return userCreated;
    }

    async getAllUsers() {
        const users = await prismaClient.user.findMany();
        return users;
    }
}

export { UserService };
