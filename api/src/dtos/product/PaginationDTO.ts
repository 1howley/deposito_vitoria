import { z } from "zod";

export const SearchPaginationSchema = z.object({
    page: z
        .string()
        .optional()
        .default("1")
        .transform((val) => parseInt(val, 10))
        .pipe(z.number().int().min(1, "A página deve ser maior ou igual a 1.")),

    limit: z
        .string()
        .optional()
        .default("10")
        .transform((val) => parseInt(val, 10))
        .pipe(z.number().int().min(1, "O limite deve ser maior ou igual a 1.")),

    search: z.string().trim().optional(),

    categoryId: z
        .string()
        .transform((val) => parseInt(val, 10))
        .pipe(z.number().int().positive())
        .optional(),
});

export type SearchPaginationDTO = z.infer<typeof SearchPaginationSchema>;
