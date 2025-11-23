import { api } from '../index';

export const ProductService = {
    create: async (data, token) => {
        const response = await api.post('/products', data, {
            headers: {
                // The token is added here, just for this specific request
                Authorization: `Bearer ${token}` 
            }
        });
        return response.data;
    },
    getAll: async () => {
        const response = await api.get('/products?page=1&limit=50');
        return response.data;
    },
    getById: async (id) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },
};
