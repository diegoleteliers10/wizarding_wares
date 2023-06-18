/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      '@layer utilities': {
        '.display-inherit': { 'display': 'inherit' },
      },
    },
  },
  plugins: [],
}

