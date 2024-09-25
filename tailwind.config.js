import tailwindAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"], // Enable dark mode
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#cecedf", // Updated primary color
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#0c284d", // Updated secondary color
          foreground: "hsl(var(--secondary-foreground))",
        },
      },
      fontFamily: {
        museo: ["'MuseoModerno'", "sans-serif"],
        nunito: ["'Nunito'", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "slide-in": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        "slide-out": {
          "0%": { width: "100%" },
          "100%": { width: "0%" },
        },
      },
      animation: {
        "slide-in": "slide-in 0.4s forwards",
        "slide-out": "slide-out 0.4s forwards",
      },
    },
  },
  plugins: [tailwindAnimate],
};
