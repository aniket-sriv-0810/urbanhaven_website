import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { FaHotel, FaShieldAlt, FaStar } from "react-icons/fa";

const TypingAnimation = () => {
  
  const features = [
    {
      icon: <FaHotel className="text-blue-600 text-5xl" />,
      title: "Premium Hotels",
      description: "Experience comfort & luxury",
      hoverShadow: "hover:shadow-yellow-400/60",
    },
    {
      icon: <FaShieldAlt className="text-green-600 text-5xl" />,
      title: "Secure Bookings",
      description: "Your safety is our priority",
      hoverShadow: "hover:shadow-green-400/60",
    },
    {
      icon: <FaStar className="text-yellow-500 text-5xl" />,
      title: "Top-Rated Stays",
      description: "Highly rated by travelers",
      hoverShadow: "hover:shadow-yellow-400/60",
    },
  ];
  return (
    <div className="w-full flex flex-col items-center justify-center text-center py-36 px-4 bg-[url('/assets/type.jpg')]  bg-cover bg-bottom
      bg-no-repeat text-white shadow-lg">
  {/* Main Heading */}
  <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold mb-5 leading-tight">
    Welcome to <span className="text-yellow-300 drop-shadow-lg">Urbanhaven</span>
  </h1>
  
  {/* Subheading */}
  <h2 className="text-xl text-gray-100  sm:text-3xl md:text-4xl font-semibold mb-2">
    Discover Unmatched Stays
  </h2>

 


    <div className="flex flex-col sm:flex-row items-center justify-center mt-12 space-y-8 sm:space-y-0 sm:space-x-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`flex items-center space-x-4 bg-white text-gray-800 px-5 py-4 sm:py-2 md:py-4 rounded-2xl shadow-2xl hover:scale-105 transition duration-300 transform ${feature.hoverShadow}`}
        >
          {feature.icon}
          <div>
            <h3 className="text-xl sm:text-sm font-bold">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
 {/* Typing Animation */}
 <h3 className="text-lg sm:text-3xl lg:text-4xl font-bold text-yellow-300 py-10 drop-shadow-xl animate-pulse">
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

  </div>
  );
};

export default TypingAnimation;
