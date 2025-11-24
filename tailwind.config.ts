import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: '#80519F',   // Main Purple
                    secondary: '#351962', // Deep Purple
                    light: '#DEDEDD',     // Light Background
                    dark: '#151521',      // Dark Background
                    accent: {
                        indigo: '#3D388C',
                        navy: '#25336E',
                        lavender: '#CCADD9',
                        cyan: '#72CBD7',
                    }
                }
            },
            fontFamily: {
                cairo: ['Cairo', 'sans-serif'],
                tajawal: ['Tajawal', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
};
export default config;
