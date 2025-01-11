import React from 'react';
import { FaWifi, FaCarAlt } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { GiToaster } from "react-icons/gi";
import { MdDinnerDining } from "react-icons/md";

const Amenities = () => {
  return (
    <div className="mt-6 space-y-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <li className="flex items-center space-x-3 text-lg">
          <FaWifi className="text-blue-500 text-2xl" />
          <span>Free Unlimited Wifi</span>
        </li>
        <li className="flex items-center space-x-3 text-lg">
          <TbAirConditioning className="text-gray-700 text-2xl" />
          <span>Air Conditioning</span>
        </li>
        <li className="flex items-center space-x-3 text-lg">
          <GiToaster className="text-yellow-500 text-2xl" />
          <span>Toaster</span>
        </li>
        <li className="flex items-center space-x-3 text-lg">
          <FaCarAlt className="text-green-500 text-2xl" />
          <span>Free Parking on Premises</span>
        </li>
        <li className="flex items-center space-x-3 text-lg">
          <MdDinnerDining className="text-orange-500 text-2xl" />
          <span>Breakfast</span>
        </li>
        <li className="flex items-center space-x-3 text-lg">
          <FaWifi className="text-blue-500 text-2xl" />
          <span>Free Unlimited Wifi</span>
        </li>
        <li className="flex items-center space-x-3 text-lg">
          <TbAirConditioning className="text-gray-700 text-2xl" />
          <span>Air Conditioning</span>
        </li>
        <li className="flex items-center space-x-3 text-lg">
          <GiToaster className="text-yellow-500 text-2xl" />
          <span>Toaster</span>
        </li>
        <li className="flex items-center space-x-3 text-lg">
          <FaCarAlt className="text-green-500 text-2xl" />
          <span>Free Parking on Premises</span>
        </li>
        <li className="flex items-center space-x-3 text-lg">
          <MdDinnerDining className="text-orange-500 text-2xl" />
          <span>Breakfast</span>
        </li>
      </ul>
    </div>
  );
};

export default Amenities;
