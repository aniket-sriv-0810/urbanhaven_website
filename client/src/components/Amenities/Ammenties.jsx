import React from 'react';
import { FaWifi, FaCarAlt } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { GiToaster } from "react-icons/gi";
import { MdDinnerDining } from "react-icons/md";

const Amenities = () => {
  return (
    <div className="mt-8 px-4 lg:px-0">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Amenities We Provide
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[
          { icon: <FaWifi className="text-blue-500 text-3xl" />, text: "Free Unlimited Wifi" },
          { icon: <TbAirConditioning className="text-gray-700 text-3xl" />, text: "Air Conditioning" },
          { icon: <GiToaster className="text-yellow-500 text-3xl" />, text: "Toaster" },
          { icon: <FaCarAlt className="text-green-500 text-3xl" />, text: "Free Parking on Premises" },
          { icon: <MdDinnerDining className="text-orange-500 text-3xl" />, text: "Breakfast" },
          { icon: <TbAirConditioning className="text-gray-700 text-3xl" />, text: "Cool Air Conditioning" },
          { icon: <GiToaster className="text-yellow-500 text-3xl" />, text: "Premium Toaster" },
          { icon: <FaWifi className="text-blue-500 text-3xl" />, text: "High-Speed Wifi" },
        ].map((amenity, index) => (
          <li
            key={index}
            className="flex items-center space-x-4 p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300"
          >
            <div>{amenity.icon}</div>
            <span className="text-lg font-medium text-gray-700">{amenity.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Amenities;
