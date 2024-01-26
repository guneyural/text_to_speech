/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        50: "50px",
      },
      width: {
        "50%": "50%",
        "75%": "75%",
        "100%": "100%",
      },
    },
  },
  plugins: [],
};
