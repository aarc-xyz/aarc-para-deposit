/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aarc-bg': '#2D2D2D',
        'aarc-primary': '#A5E547',
        'aarc-secondary': '#003300',
        'aarc-text': '#C3C3C3',
        'aarc-button-text': '#003300',
        'aarc-border': '#3D3D3D',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        'aarc': '4px 8px 8px 4px #0000001A',
      },
      borderImage: {
        'gradient': 'linear-gradient(145.73deg, rgba(165, 229, 71, 0.3) 0%, rgba(128, 26, 229, 0.3) 20%, rgba(165, 229, 71, 0.3) 80%, rgba(128, 26, 229, 0.3) 100%) 1',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '24px 24px',
      },
    },
  },
  plugins: [],
}

