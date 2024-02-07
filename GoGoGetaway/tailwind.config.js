/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './src/App.jsx'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'light-blue': 'var(--light-blue)',
        'clr-blue-400': '#4EA8FC',
        'clr-red-400': '#FF6584',
        'secondary-text': '#757575',
      },
      height: {
        100: '26rem',
      },
      borderWidth: {
        1: '1px',
        0.5: '0.5px',
      },
      padding: {
        'custom-1': '1.5rem',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      spacing: {
        'neg-4': '-2rem', // Assuming '4' is not already used for a different value
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'deep-inner': 'inset 0 2px 3px 2px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
};
