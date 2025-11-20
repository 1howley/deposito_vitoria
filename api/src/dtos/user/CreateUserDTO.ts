import { RoleEnum } from "../../common/enums/RoleEnum.js";
import { z } from "zod";

export const CreateUserSchema = z.object({
    userId: z.string(),
    email: z
        .string({
            error: "O email é obrigatório",
        })
        .email("Formato de email inválido (ex: usuario@dominio.com)."),

    name: z.string().optional(),
    role: z.enum(RoleEnum).optional(),
    authProvider: z.string(),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
