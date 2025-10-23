import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
export const api = axios.create({
    // eslint-disable-next-line no-undef
    baseURL: process.env.VITE_API_URL || "http://localhost:3000/",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});
