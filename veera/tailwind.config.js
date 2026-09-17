/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#073020', // Auspicious Leaf Green
        'brand-orange': '#D4AF37', // Marigold / Saffron Orange
        'brand-beige': '#FDF7E5', // Warm Haldi Cream
        'brand-beige-darker': '#E8D190', // Darker Haldi Cream
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0.4' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
      }
    },
  },
  plugins: [],
}
