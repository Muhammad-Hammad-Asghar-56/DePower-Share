/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}","./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"],
  darkMode: "",  // You can specify 'media' or 'class' here if needed
  theme: {
    extend: {
      colors: {
        lightOrange: '#ffa333',  // You can adjust the hex code to your preference
        lightOrangeDark: '#F5A142', // Adjust to your hover color
        customBlack:"#1F2937"
      },
    },
  },
  plugins: [],
};
