/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'signup-bg': "url('/assets/sign-up-bg.jpg')",
        'booking-bg': "url('/assets/booking-bg.jpg')",
        'bg-newHotel' : "url('/assets/bg-newHotel.jpg')",
        'home-bg' : "url('/assets/home.jpg')",
        'home-banner' : "url('/assets/home-banner.jpg')",
      },
    },
  },
  plugins: [],
}