import axios from "axios";

export const api = axios.create({
    // eslint-disable-next-line no-undef
    baseURL: "http://localhost:3000/",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});
