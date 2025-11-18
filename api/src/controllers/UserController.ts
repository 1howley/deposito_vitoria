import type { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/UserService.js";
import { CreateUserSchema, CreateUserDTO } from "../dtos/user/CreateUserDTO.js";
import { LoginSchema, LoginDTO } from "../dtos/user/LoginDTO.js";

export class UserController {
    private userService = new UserService();

    async createUser(request: FastifyRequest, reply: FastifyReply){
        try{
            const validationResult = CreateUserSchema.safeParse(request.body);

            if(!validationResult.success){
                return reply.status(400).send({
                    error: "Erro de validação de cadrastro.",
                    details: validationResult.error.issues,
                });
            }

            const userValidatedData: CreateUserDTO = validationResult.data;
            const user = await this.userService.createUser(userValidatedData);
            
            reply.status(201).send(user);
        }catch (error: any) {
             reply.status(500).send({ error: error.message });
        }
    }

    async listAllUsers(request: FastifyRequest, reply: FastifyReply){
        const usersList = await this.userService.getAllUsers();

        reply.send(usersList);
    }

    async loginUser(request: FastifyRequest, reply: FastifyReply){
        try{
            const validationResult = LoginSchema.safeParse(request.body);

            if(!validationResult.success){
                return reply.status(400).send({
                    error: "Dados de login inválidos",
                    details: validationResult.error.issues,
                });
            }

            const {email, password} = validationResult.data;
            const result = await this.userService.loginUser(email, password);

            reply.status(200).send(result);
        }catch (error: any){
            const statusCode = error.message.include("Inválidas") ? 401: 500;
            reply.status(statusCode).send({error: error.message});
        }
    }   
}

