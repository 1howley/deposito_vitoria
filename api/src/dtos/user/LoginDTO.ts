import { z } from "zod";

export const LoginSchema = z.object({
    email: z
        .string({
            required_error: "O email é obrigatório para o login.",
        })
        .email("Formato de email inválido."),

    password: z.string({
        required_error: "A senha é obrigatória para o login.",
    }),
});

export type LoginDTO = z.infer<typeof LoginSchema>;
