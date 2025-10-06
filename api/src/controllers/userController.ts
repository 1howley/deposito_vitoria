import type { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/userService.js";

class UserController {
    
    async CreateUser(request: FastifyRequest, reply: FastifyReply) {
        const userService = new UserService();
        const user = userService.createUser();
        
        reply.send(user);
    }
}

export { UserController }