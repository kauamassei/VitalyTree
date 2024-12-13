/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",],
    theme: {
        extend: {
            colors: {
                'gray-20': '#F8F4EB',
                'gray-50': '#EFE6FE6',
                'gray-100': '#DFCCCC',
                'gray-500': '#1C1C1C',
                'primary-100': '#c5ffe4',
                'primary-300': '#13cca4',
                'primary-500': '#4effa6',
                'secondary-400': '#ff5858',
                'secondary-500': '#23d482',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                }
            },
            backgroundImage: () => ({
                "gradient-yellowred": "linear-gradient(90deg, #FF16A 0%, #FFC837 100%)",
                "mobile-home": "url('./assets/HomePageGraphic,png')",
                "auth":"url('./assets/fundo.jpeg')",
            }),
            fontFamily: {
                dmsans: ["DM Sans", "sans-serif"],
                monserrat: ["Montserrat", "sans-serif"]
            },
            content: {
                evolvetext: 'url("./assets/EvolveText.png")',
                abstractwaves: 'url("./assets/AbstractWaves.png")',
                sparkle: 'url("./assets/Sparkle.png")',
                circles: 'url("./assets/Circles.png")'
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            }
        },
        screens: {
            xs: '480px',
            sm: '768px',
            md: '1060px'
        }
    },
    plugins: [require("tailwindcss-animate")],
}
