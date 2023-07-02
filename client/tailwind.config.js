/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./src/styles.js"],
  theme: {
    extend: {
      fontFamily: {
        "grand-hotel": ['"Grand Hotel"', "cursive"],
        "quicksand": ["Quicksand", "sans-serif"],
      },
      colors: {
        primary: "#58391C",
        secondary: "#ffe6a7",
      },
    },
  },
  plugins: [],
};
