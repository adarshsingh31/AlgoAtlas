/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#08090f',
        panel: '#10121d',
        indigo: {
          DEFAULT: '#7c7ff5',
          soft: 'rgba(124, 127, 245, 0.14)',
        },
        green: '#34d399',
        amber: '#f4b740',
        red: '#f0656f',
      },
    },
  },
  plugins: [],
}
