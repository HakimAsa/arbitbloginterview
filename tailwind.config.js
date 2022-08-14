/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xs: { max: '400px' },
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: '#ff4800',
        'black-100': 'rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
