import React, { useEffect } from "react";
import { BiErrorCircle } from "react-icons/bi";

const ShowErrorToast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000); // Auto dismiss after 5 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-md z-50 animate-fadeIn">
      <div className="bg-white p-5 sm:p-6 rounded-xl shadow-2xl w-11/12 sm:w-96 transform transition-all scale-95 sm:scale-100">
        <div className="flex items-center justify-center text-red-600 text-xl sm:text-2xl font-semibold">
          <BiErrorCircle className="mr-2" />
          <h2 className="text-center">Error</h2>
        </div>
        <p className="mt-3 text-sm sm:text-base text-gray-700 text-center leading-relaxed">
          {message}
        </p>
        <button
          onClick={onClose}
          className="mt-5 w-full bg-red-600 text-white py-2 rounded-lg shadow-md text-sm sm:text-base font-medium tracking-wide hover:bg-red-700 transition-all duration-200 ease-in-out focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ShowErrorToast;
