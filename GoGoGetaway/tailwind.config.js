/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/App.jsx"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {},
      height: {
        100: "26rem",
      },
      borderWidth: {
        1: "1px",
        0.5: "0.5px",
      },
    },
  },
  plugins: [],
};
