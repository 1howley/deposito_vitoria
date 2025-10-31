import { api } from "..";

export const setUser = async (userData) => {
    try {
        const response = await api.post("/users", userData);
        console.log("User set successfully:", response.data);
    } catch (error) {
        console.error("Error setting user:", error);
    }
};
