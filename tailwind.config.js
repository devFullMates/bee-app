/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-brown': '#652911',
        'custom-orange': '#D98C38',
        'card-background': 'rgba(255, 255, 255, 0.4)', // Define a color with opacity
      },
    },
  },
  plugins: [],
}