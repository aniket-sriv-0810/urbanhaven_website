import React from 'react';
import { FaWifi, FaCarAlt , FaBed } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { GiToaster , GiCctvCamera , GiCoffeeCup , GiBroom  } from "react-icons/gi";
import { MdDinnerDining , MdOutlinePool} from "react-icons/md";
import { IoIosFitness , IoMdTv } from "react-icons/io";
const Amenities = () => {
  return (
     <div className="mt-12 px-6 lg:px-20">
      <h2 className="text-xl font-bold text-center text-gray-800 mb-10">
        Amenities & Services Available
      </h2>
      <ul className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
        {[
          { icon: <FaWifi className="text-blue-500 text-4xl" />, text: "Free Unlimited Wifi" },
          { icon: <TbAirConditioning className="text-gray-700 text-4xl" />, text: "Air Conditioning" },
          { icon: <GiToaster className="text-yellow-500 text-4xl" />, text: "Toaster" },
          { icon: <FaCarAlt className="text-green-500 text-4xl" />, text: "Free Parking on Premises" },
          { icon: <MdDinnerDining className="text-orange-500 text-4xl" />, text: "Breakfast" },
          { icon: <FaBed  className="text-purple-700 text-4xl" />, text: "24/7 Room Service" },
          { icon: <IoIosFitness className="text-cyan-500 text-4xl" />, text: " Fitness Center " },
          { icon: <MdOutlinePool className="text-blue-500 text-4xl" />, text: "Swimming Pool" },
          { icon: <GiCctvCamera className="text-gray-900 text-4xl" />, text: "CCTV Surveillance" },
          { icon: <GiCoffeeCup  className="text-zinc-600 text-4xl" />, text: "Welcome Coffee" },
          { icon: <IoMdTv className="text-black text-4xl" />, text: "LED Television" },
          { icon: <GiBroom  className="text-teal-500 text-4xl" />, text: "Full Cleanliness" },
        ].map((amenity, index) => (
          <li
            key={index}
            className="flex flex-row items-center border-2 border-gray-200 gap-4 xs:flex-col sm:flex-row md:flex-col text-center p-3 xs:p-5 bg-slate-100 shadow-md rounded-3xl hover:shadow-2xl hover:shadow-gray-300 transition-transform transform hover:scale-105 duration-300"
          >
            <div className="bg-white rounded-full p-4">
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
