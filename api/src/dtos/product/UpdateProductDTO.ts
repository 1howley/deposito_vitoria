import { z } from "zod";

export const UpdateProductSchema = z.object({
    name: z
        .string()
        .min(3, "O nome deve ter pelo menos 3 caracteres.")
        .optional(),

    description: z.string().optional(),

    // CORREÇÃO 1: Alterado de 'price' para 'basePrice' para bater com o banco
    basePrice: z
        .number({
            error: "O preço deve ser um número.",
        })
        .positive("O preço deve ser maior que zero.")
        .optional(),

    stock: z
        .number({
            error: "O estoque deve ser um número inteiro.",
        })
        .int("O estoque deve ser um número inteiro")
        .min(0, "O estoque não pode ser negativo")
        .optional(),

    brand: z.string().optional(),

    // CORREÇÃO 2: Alterado de 'categoryId' (number) para 'category' (string)
    category: z.string().optional(),
});

export type UpdateProductDTO = z.infer<typeof UpdateProductSchema>;