/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: '#FFD55E',
        orange: '#FF6C5A',
        orangeGradient: '#FF855E',
        orangeOpacity: '#FFD7D7',
        errorFill: '#FF6A50',
        errorStroke: '#FF4141',
        errorFont: '#FF3131',
        cat: '#F6F6F6'
      },
      boxShadow: {
        'menu': '0 -2px 15px 0px rgba(0, 0, 0, 0.17)',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      fontWeight: {
        'thin': '100',
        'extralight': '200',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      },
      padding: {
        '50%': '50%',
      }
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#FF6C5A",

          "secondary": "#ffffff",

          "accent": "#ffffff",

          "neutral": "#ffffff",

          "base-100": "#ffffff",

          "info": "#ffffff",

          "success": "#00ffff",

          "warning": "#ffffff",

          "error": "#ffffff",

          "orange": "#FF6C5A",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}