import tailwindAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"], // Enable dark mode
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: "true",
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
          DEFAULT: "#cecedf",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#051224",
          foreground: "hsl(var(--secondary-foreground))",
        },
      },
      fontFamily: {
        museo: ["'MuseoModerno'", "sans-serif"],
        nunito: ["'Nunito'", "sans-serif"],
        gilda: ["'GildaDisplay'", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "slide-in": {
          "0%": {
            width: "0%",
          },
          "100%": {
            width: "100%",
          },
        },
        "slide-out": {
          "0%": {
            width: "100%",
          },
          "100%": {
            width: "0%",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "slide-in": "slide-in 0.4s forwards",
        "slide-out": "slide-out 0.4s forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindAnimate],
};
