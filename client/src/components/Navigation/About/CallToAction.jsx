import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <div className="text-center mt-24 mb-20" data-aos="fade-down">
      <h3 className="text-2xl font-bold text-gray-700 mb-4">
        Your Perfect Stay Awaits
      </h3>
      <p className="text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
        Browse through our curated selection of premium hotels and find your perfect getaway. Your next memorable stay is just a click away!
      </p>
      <Link to="/">
      <button className="mt-6 bg-gradient-to-b from-red-500  to-purple-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-500 transition duration-300 transform hover:scale-105" >
        Explore Stays
      </button>
      </Link>
    </div>
  );
};

export default CallToAction;
