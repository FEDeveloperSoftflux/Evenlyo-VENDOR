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
        // Brand colors
        brand: {
          primary: '#E31B95',
          secondary: '#FF295D',
          tertiary: '#C817AE',
        },
        primary: {
          DEFAULT: '#E31B95',
          from: "#FF295D",
          mid: "#E31B95",
          to: "#C817AE",
          50: '#FCE7F3',
          100: '#F9A8D4',
          500: '#E31B95',
          600: '#C817AE',
          700: '#A613A0'
        },
        secondary: {
          DEFAULT: '#FF295D'
        },
        background: "#FBFBFF",
        sidebar: "#FFFFFF",
        white: '#FFFFFF',
        black: '#000000',
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#666666',
          700: '#2F2F2F',
          800: '#1F2937',
          900: '#111827',
        },
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(180deg, #FF295D 0%, #E31B95 48.56%, #C817AE 100%)",
        'gradient-brand': 'linear-gradient(180deg, #FF295D 0%, #E31B95 50%, #C817AE 100%)',
        'gradient-brand-hover': 'linear-gradient(90deg, #E31B95 0%, #C817AE 50%, #A613A0 100%)',
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
