import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { FaHotel, FaShieldAlt, FaStar } from "react-icons/fa";

const TypingAnimation = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center py-16 bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">
        Welcome to <span className="text-yellow-300">Urbanhaven</span>
      </h1>
      <h2 className="text-2xl sm:text-3xl font-semibold">We provide</h2>

      {/* Typing Animation */}
      <h3 className="text-3xl sm:text-4xl font-bold text-yellow-300 mt-3">
        <Typewriter
          words={[
            "Luxurious & Affordable Stays ✨",
            "24/7 Secure & Hassle-Free Booking 🔒",
            "Top-Rated & Verified Properties ⭐",
          ]}
          loop={true}
          cursor
          cursorStyle="|"
          typeSpeed={80}
          deleteSpeed={50}
          delaySpeed={2000}
        />
      </h3>

      {/* Features Section */}
      <div className="flex flex-col sm:flex-row items-center justify-center mt-10 space-y-6 sm:space-y-0 sm:space-x-8">
        <div className="flex items-center space-x-3 bg-white text-gray-800 px-6 py-4 rounded-xl shadow-lg hover:scale-105 transition duration-300">
          <FaHotel className="text-blue-600 text-4xl" />
          <div>
            <h3 className="text-xl font-semibold">Premium Hotels</h3>
            <p className="text-sm">Experience comfort & luxury</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 bg-white text-gray-800 px-6 py-4 rounded-xl shadow-lg hover:scale-105 transition duration-300">
          <FaShieldAlt className="text-green-600 text-4xl" />
          <div>
            <h3 className="text-xl font-semibold">Secure Bookings</h3>
            <p className="text-sm">Your safety is our priority</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 bg-white text-gray-800 px-6 py-4 rounded-xl shadow-lg hover:scale-105 transition duration-300">
          <FaStar className="text-yellow-500 text-4xl" />
          <div>
            <h3 className="text-xl font-semibold">Top-Rated Stays</h3>
            <p className="text-sm">Highly rated by travelers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingAnimation;
