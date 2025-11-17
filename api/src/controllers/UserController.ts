import type { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/UserService.js";
import type { CreateUserDTO } from "../dtos/user/CreateUserDTO.js";

export class UserController {
    private userService = new UserService();

    createUser = async (request: FastifyRequest, reply: FastifyReply) => {
        try{
            const user = request.body as CreateUserDTO;
            const userCreated = await this.userService.createUser(user);

            reply.status(201).send(userCreated);
        }catch (error: any) {
             reply.status(400).send({ error: error.message });
    }

    listAllUsers = async (request: FastifyRequest, reply: FastifyReply) => {
        const usersList = await this.userService.getAllUsers();

        reply.send(usersList);
    }

    loginUser = async (request: FastifyRequest, reply: FastifyReply) => {
        try{
            const {email,password} = request.body as any;
            const result = await this.userService.loginUser(email, password);

            reply.status(200).send(result);
        }catch (error: any){
            const statusCode = error.message.include("Inválidas") ? 401: 500;
            reply.status(statusCode).send({error: error.message});
            }
        }   
    }
}
