import {z} from "zod";

export const UpdateProductSchema = z.object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres.").optional(),

    description: z.string().optional(),

    price: z.number({
        required_error: "O preço deve ser um número."
    }).positive("O preço deve ser maior que zero.").optional(),

    stock: z.number({
        required_error: "O estoque deve ser um número inteiro."
    }).int("O estoque deve ser um número inteiro").min(0, "O estoque não pode ser negativo").optional(),

    categoryId: z.number().int().optional(),
});

export type UpdateProductDTO = z.infer<typeof UpdateProductSchema>;
