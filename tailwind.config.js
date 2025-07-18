/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFCB05",     // Bright yellow (brand accent)
        secondary: "#121212",   // Dark background
        accent: "#1DB954",      // Spotify green for highlights
        muted: "#2C2C2C",       // Card backgrounds, section boxes
        border: "#333333",      // Soft dividers
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.3)",
      },
      spacing: {
        'section': '3rem',
      },
    },
  },
  plugins: [],
};

