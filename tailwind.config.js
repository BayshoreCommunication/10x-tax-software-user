import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)", // Use CSS variable for primary
        hoverColor: "var(--hover-color)", // Define hover color dynamically in CSS
        secondary: "#1F263E",
        black: "#000000",
        white: "#FFFFFF",
      },
      maxWidth: {
        custom: "1920px",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "2rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
      screens: {
        "2xl": "1920px",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

export default config;
