/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        netflix: {
          red: '#e50914',
          darkRed: '#b81d24',
          black: '#141414',
          dark: '#181818',
          gray: '#808080',
          lightGray: '#b3b3b3',
          darkGray: '#333333',
          border: '#404040',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      height: {
        'movie-card-sm': '140px',
        'movie-card-md': '200px',
        'movie-card-lg': '250px',
      },
    },
  },
  plugins: [],
}
