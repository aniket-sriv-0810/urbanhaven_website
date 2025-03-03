import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const HotelRow = ({ hotel }) => {
  const navigate = useNavigate();

  return (
    <tr className="hover:bg-zinc-600 hover:text-white text-gray-800">
      <td className="border border-gray-200 px-4 py-2 text-center">
        <img
          src={hotel.image}
          alt={hotel.title}
          className="w-12 h-12 shadow-lg shadow-gray-700 md:w-16 md:h-16 rounded-full mx-auto object-cover border border-gray-600"
        />
      </td>
      <td className="border border-gray-200 px-4 py-2 text-center">{hotel.title}</td>
      <td className="border border-gray-200 px-4 py-2 text-center">₹ {hotel.price}</td>
      <td className="border border-gray-200 px-4 py-2 text-center">{hotel.city}</td>
      <td className="border border-gray-200 px-4 py-2 text-center">{hotel.state}</td>
      <td className="border border-gray-200 px-4 py-2 text-center">{hotel.country}</td>
      <td className="border border-gray-200 px-4 py-2 text-center">
        <button
          onClick={() => navigate(`/admin/hotel-details/${hotel._id}/edit`)}
          className="flex items-center gap-x-3 bg-green-500 px-4 py-4 m-auto rounded-full text-white hover:bg-green-600 hover:scale-110 transition-colors"
        >
          <FaEdit />
        </button>
      </td>
      <td className="border border-gray-200 px-4 py-2 text-center">
        <button
          onClick={() => navigate(`/admin/hotel/${hotel._id}/delete`)}
          className="flex items-center gap-x-2 m-auto bg-red-600 px-4 py-4 rounded-full text-white hover:bg-red-700 hover:scale-110 transition-colors"
        >
          <MdDeleteForever />
        </button>
      </td>
    </tr>
  );
};

export default HotelRow;
