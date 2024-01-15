/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Montserrat", "Open Sans", "Ubuntu", "Arial", "sans-serif"],
      open: ["Open Sans", "Montserrat", "Ubuntu", "Arial", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#025beb",
        error: "#fc3232",
        nav: "#dcfcfc",
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
      },
    },
  },
  plugins: [],
};
