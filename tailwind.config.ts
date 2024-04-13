import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 7s linear infinite',
      },
      screens: {
        '3xl': '2200px',
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
