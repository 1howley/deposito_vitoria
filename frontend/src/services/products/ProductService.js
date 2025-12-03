import { api } from "../index";

export const ProductService = {
    create: async (data, token) => {
        const response = await api.post("/products", data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    },
    getAll: async () => {
        const response = await api.get("/products?page=1&limit=100"); // Aumentei o limite para admin ver tudo
        return response.data;
    },
    getById: async (id) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },
    // NOVOS MÉTODOS
    update: async (id, data, token) => {
        const response = await api.put(`/products/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    },
    delete: async (id, token) => {
        await api.delete(`/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },
};
