export interface CreateProductDTO {
    name: string;
    description?: string;
    basePrice: number;
    stock: number;
    brand?: string;
    category?: string;
}
