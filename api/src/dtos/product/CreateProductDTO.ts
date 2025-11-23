import { z } from "zod";

export const CreateProductSchema = z.object({
    name: z
        .string({
            error: "O nome do produto é obrigatório.",
        })
        .min(3, "O nome deve ter pelo menos 3 caracteres."),

    description: z.string().optional(),

    basePrice: z
        .number({
            error: "O preço é obrigatório e deve ser um número.",
            invalid_type_error: "O preço deve ser um número.",
        })
        .positive("O preço deve ser maior que zero."),

    stock: z
        .number({
            error: "O estoque é obrigatório e deve ser um número inteiro.",
            invalid_type_error: "O estoque deve ser um número inteiro.",
        })
        .int("O estoque deve ser um número inteiro.")
        .min(0, "O estoque não pode ser negativo."),

    brand: z.string().optional(),
    category: z.string().optional(),
});

export type CreateProductDTO = z.infer<typeof CreateProductSchema>;
