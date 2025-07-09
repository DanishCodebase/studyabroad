/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        growLine: {
          '0%': { transform: 'translateX(-50%) scaleX(0)' },
          '100%': { transform: 'translateX(-50%) scaleX(1)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-out forwards',
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
        growLine: 'growLine 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
};
