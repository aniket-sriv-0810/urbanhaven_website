import React from "react";

const CallToAction = () => {
  return (
    <div className="text-center mt-16">
      <h3 className="text-2xl font-bold text-gray-700 mb-4">
        Your Perfect Stay Awaits
      </h3>
      <p className="text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
        Browse through our curated selection of premium hotels and find your perfect getaway. Your next memorable stay is just a click away!
      </p>
      <button className="mt-6 bg-teal-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-500 transition duration-300 transform hover:scale-105">
        Explore Stays
      </button>
    </div>
  );
};

export default CallToAction;
