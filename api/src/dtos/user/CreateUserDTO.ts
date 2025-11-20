import type { Role } from "../../common/enums/RoleEnum.js";
import { z } from "zod";

export const CreateUserSchema = z.object({
    email: z
        .string({
            required_error: "O email é obrigatório",
        })
        .email("Formato de email inválido (ex: usuario@dominio.com)."),

    password: z
        .string({
            required_error: "A senha é obriatória",
        })
        .min(8, "A senha deve ter no mínimo 8 caracteres."),

    name: z.string().optional(),

    authProvider: z.string().optional(),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
