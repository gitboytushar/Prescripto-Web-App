/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5f6fff'
      },
      animation: {
        shine: 'shine var(--duration) infinite linear'
      },
      keyframes: {
        shine: {
          '0%': {
            'background-position': '0% 0%'
          },
          '50%': {
            'background-position': '100% 100%'
          },
          to: {
            'background-position': '0% 0%'
          }
        }
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
