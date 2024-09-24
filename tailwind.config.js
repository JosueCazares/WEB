/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  darkMode:'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height:{
        '50': '50px',
      }
    },
    colors: {
    
      'color-base': '#F4F4F4',
     
    },
    fontFamily: {
      Lato: "'Lato', sans-serif",
      Bebas: "'Bebas Neue', cursive",
      Roboto: "Roboto', 'sans-serif",
    }
  },
  plugins: [],

}

