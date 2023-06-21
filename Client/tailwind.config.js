/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      '@layer utilities': {
        '.display-inherit': { 'display': 'inherit' },
      },
      colors: {
        wwwhite: '#EAE0D5',     
        wwbrown: '#5E503F',    
        wwblack: '#0A0908',
        wwmaroon: '#692323',
        wwbeige: '#C6AC8F',
        wwoffwhite: '#F8F0E3'      
      },
    },
  },
  plugins: [],
}

