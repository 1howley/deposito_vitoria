import { z } from "zod";

export const CreateProductSchema = z.object({
    name: z
        .string({
            error: "O nome do produto é obrigatório.",
        })
        .min(3, "O nome deve ter pelo menos 3 caracteres."),

    description: z.string().optional(),

    price: z
        .number({
            error: "O preço é obrigatório e deve ser um número.",
        })
        .positive("O preço deve ser maior que zero."),

    stock: z
        .number({
            error:
                "O estoque é obrigatório e deve ser um número inteiro.",
        })
        .int("O estoque deve ser um número inteiro.")
        .min(0, "O estoque não pode ser negativo."),

    categoryId: z.number().int().optional(),
});

export type CreateProductDTO = z.infer<typeof CreateProductSchema>;
