/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#dfdee0",
        "light-bg": "#f2f2f2",
        primary: "#ffeb0b",
        secondary: "#91d99c",
        tertiary: "#f6bde9",
      },
    },
  },
  plugins: [],
};
