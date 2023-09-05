/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      height: {
        '400px': '400px',
        '900px' : '900px'
      },
      width: {
        '250px': '250px',
        '1000px': '1000px'
      },
      maxWidth: {
        '250x': '250px',
      },
      maxHeight: {
        '400px': '400px',
      }
    },
  },
  plugins: [],
}

