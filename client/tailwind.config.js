/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'signup-bg': "url('/assets/bg.jpg')",
        'booking-bg': "url('/assets/booking-bg.jpg')",
      },
    },
  },
  plugins: [],
}