import type { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/UserService.js";
import type { CreateUserDTO } from "../dtos/user/CreateUserDTO.js";

class UserController {
    private userService = new UserService();
    
    createUser = async (request: FastifyRequest, reply: FastifyReply) => {
        const user = request.body as CreateUserDTO;
        const userCreated = await this.userService.createUser(user);

        reply.send(userCreated);
    }

    listAllUsers = async (request: FastifyRequest, reply: FastifyReply) => {
        const usersList = await this.userService.getAllUsers();

        reply.send(usersList);
    }
}

export { UserController };
