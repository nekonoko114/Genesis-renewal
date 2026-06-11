/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./main.js",
    "./**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        'triad-red': '#FF1414',
        'triad-pink': '#FF9494',
        'triad-lime': '#C9FF94',
        'triad-cyan': '#94FFFF',
        'triad-purple': '#C994FF',
      },
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
      },
      animation: {
        'fluid': 'fluidBg 15s ease infinite',
      },
      keyframes: {
        fluidBg: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      }
    },
  },
  plugins: [],
}
