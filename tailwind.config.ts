import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/assets/*.{png,jpg,jpeg,js,css}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 7s linear infinite',
      },
      screens: {
        '3xl': '2200px',
      },
      colors: {
        'black': '#000000',
        'custom-yellow': '#FFD700',
      },
    }
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['light', 'dark'],
  },
  darkMode: ['class', '[data-theme="dark"]']
};

export default config;
