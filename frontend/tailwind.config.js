/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // <-- Esta linha é a mais importante!
    ],
    theme: {
        extend: {
            width: {
                "menu-dropdown": "320px",
            },
            colors: {
                "vermelho-botao": "#ba2025",
                // você também pode adicionar o verde do seu hover
                "verde-hover": "#00a86b",
                "avatar-roxo": "#6a48d9",
            },
        },
    },
    plugins: [],
};
