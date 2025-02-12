import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { FaHotel, FaShieldAlt, FaStar } from "react-icons/fa";

const TypingAnimation = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center py-20 px-4 bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-600 text-white shadow-lg">
  {/* Main Heading */}
  <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold mb-5 leading-tight">
    Welcome to <span className="text-yellow-300 drop-shadow-lg">Urbanhaven</span>
  </h1>
  
  {/* Subheading */}
  <h2 className="text-xl text-gray-100  sm:text-3xl md:text-4xl font-semibold mb-2">
    Discover Unmatched Stays
  </h2>

  {/* Typing Animation */}
  <h3 className="text-xl sm:text-3xl lg:text-4xl font-bold text-yellow-300 mt-4 drop-shadow-xl animate-pulse">
    <Typewriter
      words={[
        " Luxurious & Affordable Stays",
        " 24/7 Secure & Hassle-Free Booking",
        " Top-Rated & Verified Properties",
      ]}
      loop={true}
      cursor
      cursorStyle="|"
      typeSpeed={70}
      deleteSpeed={40}
      delaySpeed={1800}
    />
  </h3>

  {/* Features Section */}
  <div className="flex flex-col sm:flex-row items-center justify-center mt-12 space-y-6 sm:space-y-0 sm:space-x-8">
    {/* Feature 1 - Hotels */}
    <div className="flex items-center space-x-4 bg-white text-gray-800 px-8 py-5 rounded-2xl shadow-2xl hover:scale-105 transition duration-300 transform hover:shadow-yellow-400/60">
      <FaHotel className="text-blue-600 text-5xl" />
      <div>
        <h3 className="text-xl sm:text-base font-bold">Premium Hotels</h3>
        <p className="text-sm text-gray-600">Experience comfort & luxury</p>
      </div>
    </div>

    {/* Feature 2 - Secure Booking */}
    <div className="flex items-center space-x-4 bg-white text-gray-800 px-8 py-5 rounded-2xl shadow-2xl hover:scale-105 transition duration-300 transform hover:shadow-green-400/60">
      <FaShieldAlt className="text-green-600 text-5xl" />
      <div>
        <h3 className="text-xl sm:text-base font-bold">Secure Bookings</h3>
        <p className="text-sm text-gray-600">Your safety is our priority</p>
      </div>
    </div>

    {/* Feature 3 - Top Ratings */}
    <div className="flex items-center space-x-4 bg-white text-gray-800 px-8 py-5 rounded-2xl shadow-2xl hover:scale-105 transition duration-300 transform hover:shadow-yellow-400/60">
      <FaStar className="text-yellow-500 text-5xl" />
      <div>
        <h3 className="text-xl sm:text-base font-bold">Top-Rated Stays</h3>
        <p className="text-sm text-gray-600">Highly rated by travelers</p>
      </div>
    </div>
  </div>
</div>
  );
};

export default TypingAnimation;
