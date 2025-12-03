import { api } from "../index";

export const OrderService = {
    create: async (orderData, token) => {
        const response = await api.post("/orders", orderData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    },

    getMyOrders: async (token) => {
        const response = await api.get("/orders", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    },

    // Você pode adicionar outros métodos futuramente, ex:
    getAll: async (token, page = 1, limit = 10) => {
        const response = await api.get(
            `/orders/all?page=${page}&limit=${limit}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    },

    updateStatus: async (id, status, token) => {
        const response = await api.put(
            `/orders/${id}`,
            { status },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    },
};
