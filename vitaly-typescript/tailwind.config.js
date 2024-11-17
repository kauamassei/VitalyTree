/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        "gray-20": "#F8F4EB",
        "gray-50": "#EFE6FE6",
        "gray-100": "#DFCCCC",
        "gray-500": "#1C1C1C",
        "primary-100": "#c5ffe4",
        "primary-300": "#13cca4",
        "primary-500": "#4effa6",
        "secondary-400": "#ff5858",
        "secondary-500": "#23d482",
      },
      backgroundImage: (theme) => ({
        "gradient-yellowred": "linear-gradient(90deg, #FF16A 0%, #FFC837 100%)",
        "mobile-home": "url('./assets/HomePageGraphic,png')"
      }),
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        monserrat: ["Montserrat", "sans-serif"]
      },
      content: {
        evolvetext: "url('./assets/EvolveText.png')",
        abstractwaves: "url('./assets/AbstractWaves.png')",
        sparkle: "url('./assets/Sparkle.png')",
        circles: "url('./assets/Circles.png')",
      }
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px"
    }
  },
  plugins: [],
}