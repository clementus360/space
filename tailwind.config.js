module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlack: '#1A1B1E',
        lightGrey: '#E5E5E5',
        darkGrey: '#67767E',
        lightGreen: '#B7FFD4',
        darkGreen: '#3CB46C',
        lightRed: '#FFB7B7'
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"]
      }
    },
  },
  plugins: [],
}
