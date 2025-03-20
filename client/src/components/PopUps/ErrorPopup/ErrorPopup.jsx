import React, { useEffect, useState } from "react";
import { FaTimesCircle } from "react-icons/fa";

const ErrorPopup = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500); // Delay closing for fade-out animation
    }, 4000); // Display for 4 seconds

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
        {/* Animated Error Icon */}
        <div className="animate-shake">
          <FaTimesCircle className="text-red-500 text-6xl mx-auto" />
        </div>

        {/* Error Message */}
        <h2 className="text-lg font-semibold text-red-600 mt-4">
          Oops! Something Went Wrong
        </h2>
        <p className="text-sm text-gray-500 mt-2">{message}</p>

        {/* Animated Close Button */}
        <button
          className="mt-5 bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium px-5 py-2 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          onClick={() => setIsVisible(false)}
        >
           Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorPopup;