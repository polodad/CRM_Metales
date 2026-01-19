/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#ea580c', // Copper/Rust Orange
                    foreground: '#ffffff',
                },
                secondary: {
                    DEFAULT: '#334155', // Steel Blue-Grey
                    foreground: '#f8fafc',
                },
                accent: {
                    DEFAULT: '#f59e0b', // Brass/Gold
                    foreground: '#0f172a',
                },
                background: '#0f172a', // Deep Slate
                surface: '#1e293b', // Dark Steel
                text: '#f1f5f9',
            },
        },
    },
    plugins: [],
}
