import { api } from '../index';

export const ProductService = {
    create: async (data) => {
        const response = await api.post('/products', data);
        return response.data;
    },
};
