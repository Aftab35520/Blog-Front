/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,j,jsx}"],
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        '2xl': '1440px',
        '3xl': '1536px',
        'custom-height-mq': { 'raw': '((min-width: 100px) and (max-height: 630px))' },
      }
    },
  },
  plugins: [],
}

