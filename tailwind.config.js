/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        hotpink: '#ff69b4',
        neonpink: '#ff4da6',
        darkbg: '#0f0f1a',
      },
      fontFamily: {
        fancy: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
