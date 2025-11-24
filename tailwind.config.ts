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
                    dark: '#151521',      // Main Background
                    card: '#1E1E2D',      // Card Background
                    primary: '#80519F',   // Primary Purple
                    secondary: '#351962', // Darker Purple
                    accent: '#009EF7',    // Bright Blue Accent
                    success: '#50CD89',   // Green
                    warning: '#FFC700',   // Yellow
                    danger: '#F1416C',    // Red
                    text: {
                        primary: '#FFFFFF',
                        secondary: '#A1A5B7',
                        muted: '#5E6278'
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
