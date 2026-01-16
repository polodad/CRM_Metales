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
                    DEFAULT: '#2563eb',
                    foreground: '#ffffff',
                },
                secondary: {
                    DEFAULT: '#1e293b',
                    foreground: '#f8fafc',
                },
                accent: {
                    DEFAULT: '#d97706',
                    foreground: '#ffffff',
                },
                background: '#0f172a',
                surface: '#1e293b',
                text: '#f1f5f9',
            },
        },
    },
    plugins: [],
}
