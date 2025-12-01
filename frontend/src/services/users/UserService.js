import { api } from "..";

export const setUser = async (userData) => {
    try {
        const response = await api.post("/users", userData);
        console.log("User set successfully:", response.data);
    } catch (error) {
        console.error("Error setting user:", error);
    }
};

export const getUserFromBackend = async (uid) => {
    // 1. Você pode usar uma rota GET que busca o usuário pelo UID
    // 2. Você DEVE incluir o Token de ID do Firebase no cabeçalho

    const response = await api.get(`/users/${uid}`);

    return response.data; // Deve conter o objeto de usuário completo (incluindo a role)
};
