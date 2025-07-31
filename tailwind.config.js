/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        primary: {
          from: "#FF295D",
          mid: "#E31B95",
          to: "#C817AE",
        },
        background: "#FBFBFF",
        sidebar: "#FFFFFF",
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(180deg, #FF295D 0%, #E31B95 48.56%, #C817AE 100%)",
      },
      boxShadow: {
        card: "0 2px 12px rgba(0, 0, 0, 0.05)",
      },
      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
