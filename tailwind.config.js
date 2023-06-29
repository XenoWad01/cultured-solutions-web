const { tailwindPageColors } = require('./src/constants/pages-consts')


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      width: {
        '192': '48rem'
      },
      fontFamily: {
        'overpass-mono': ['Overpass+Mono', 'sans-serif']
      },
      colors: {
        // ...tailwindPageColors,
          main: '#C34D3C',
        secondary: '#3CB2C3',
        headerBg: '#020202',
        headerCardBg: '#272525',
        bgBlack: '#020202',
        darkglass: '#1b1a22',
        code: '#2b2b37'
      },
    },
  },
  plugins: [],
}
