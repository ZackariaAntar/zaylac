/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#006B61",
        secondary: {
          DEFAULT: "#E8B931",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000000",
          100: "#121111",
          200: "#1E1E1E",
        },
        white: {
          100: "#FEE9E7",
          200: "FFFFFF"
        },

        blue: {
          100: "#00A7C6",
          200: "FFFFFF"
        },
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};