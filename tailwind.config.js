/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./frontend/src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E8C2CA',
        secondary: '#F7D1CD',
        'dark-subtle': 'rgba(255,255,255,0.5)',
        'light-subtle': 'rgba(39,39,39,0.5)',
        'dark-purple': '#EC4067',
      },
    },
  },
  plugins: [],
};
