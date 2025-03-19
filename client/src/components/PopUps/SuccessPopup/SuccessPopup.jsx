import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
const SuccessPopup = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500); // Delay closing for fade-out animation
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white p-6 rounded-2xl shadow-2xl text-center w-80 transition-transform transform ${
          isVisible ? "translate-y-0 scale-100 opacity-100" : "translate-y-10 scale-95 opacity-0"
        }`}
      >
        {/* Animated Check Icon */}

        <DotLottieReact
        src="https://lottie.host/b252713a-708e-4d91-ad15-5efe7981c816/lQGVg4AsxK.lottie"
        autoplay
        />

        {/* Success Message */}
        <h2 className="text-lg font-semibold text-gray-800 mt-4">
          {message}
        </h2>
        <p className="text-sm text-gray-500 mt-2">Your changes have been saved successfully.</p>

        {/* Animated Close Button */}
        <button
          className="mt-5 bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium px-5 py-2 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          onClick={() => setIsVisible(false)}
        >
           Got It!
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;