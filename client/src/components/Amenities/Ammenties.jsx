import React from 'react';
import { FaWifi, FaCarAlt } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { GiToaster } from "react-icons/gi";
import { MdDinnerDining } from "react-icons/md";

const Amenities = () => {
  return (
     <div className="mt-12 px-6 lg:px-20">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Amenities & Services Available
      </h2>
      <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {[
          { icon: <FaWifi className="text-blue-500 text-4xl" />, text: "Free Unlimited Wifi" },
          { icon: <TbAirConditioning className="text-gray-700 text-4xl" />, text: "Air Conditioning" },
          { icon: <GiToaster className="text-yellow-500 text-4xl" />, text: "Toaster" },
          { icon: <FaCarAlt className="text-green-500 text-4xl" />, text: "Free Parking on Premises" },
          { icon: <MdDinnerDining className="text-orange-500 text-4xl" />, text: "Breakfast" },
          { icon: <TbAirConditioning className="text-gray-700 text-4xl" />, text: "Cool Air Conditioning" },
          { icon: <GiToaster className="text-yellow-500 text-4xl" />, text: "Premium Toaster" },
          { icon: <FaWifi className="text-blue-500 text-4xl" />, text: "High-Speed Wifi" },
        ].map((amenity, index) => (
          <li
            key={index}
            className="flex flex-col items-center text-center p-6 bg-gray-50 shadow-md rounded-3xl hover:shadow-2xl hover:shadow-gray-300 transition-transform transform hover:scale-105 duration-300"
          >
            <div className="bg-gray-100 rounded-full p-4 mb-4">
              {amenity.icon}
            </div>
            <span className="text-lg font-medium text-gray-700">
              {amenity.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Amenities;
