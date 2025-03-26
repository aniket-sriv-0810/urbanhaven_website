import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import {useNavigate} from "react-router-dom";
const BookingRow = ({ booking, onDelete }) => {
  const [deleting, setDeleting] = useState(false);
 const navigate = useNavigate();
  const handleDelete = async () => {
    if (deleting) return;
    setDeleting(true);

    try {
      const resp = await axios.delete(`${import.meta.env.VITE_API_URL}/v1/admin/booking/${booking._id}`, {
        withCredentials: true,
      });
      if (resp.status === 200) {
        navigate('/delete/successfully')
      }
      onDelete(booking._id); // Notify parent component
    } catch (error) {
      setDeleting(false);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <tr className="hover:bg-zinc-600 hover:text-white text-gray-800">
      <td className="border border-gray-300 px-4 py-2 text-center">{booking.userDetails?.name || "N/A"}</td>
      <td className="border border-gray-300 px-4 py-2 text-center">{booking.userDetails?.phone || "N/A"}</td>
      <td className="border border-gray-300 px-4 py-2 text-center">{booking.userDetails?.email || "N/A"}</td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        <img
          src={booking.hotelDetails?.image}
          alt={booking.hotelDetails?.title || "Hotel Image"}
          className="w-16 h-16 object-cover m-auto rounded-md border"
        />
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">{booking.hotelDetails?.title || "N/A"}</td>
      <td className="border border-gray-300 px-4 py-2 text-center">{booking.hotelDetails?.city || "N/A"}</td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        {new Date(booking.checkInDate).toLocaleDateString()}
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        {new Date(booking.checkOutDate).toLocaleDateString()}
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">{booking.paymentDetails}</td>

      {/* Payment Status Button (Aligned Properly in Its Column) */}
      <td className="border border-gray-300 px-4 py-2 text-center">
        <button
          className={`px-3 py-1 rounded-md font-medium ${
            booking.status === "Confirmed"
              ? "bg-green-500 text-white"
              : booking.status === "Pending"
              ? "bg-yellow-500 text-white"
              : booking.status === "Cancelled"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {booking.status}
        </button>
      </td>

      {/* Delete Button (Aligned in Its Column) */}
      <td className="border border-gray-300 px-4 py-2 text-center">
        <button
          onClick={handleDelete}
          disabled={deleting}
          className={`p-3 rounded-full text-white transition-colors ${
            deleting ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
          }`}
        >
          <MdDeleteForever size={20} />
        </button>
      </td>
    </tr>
  );
};

export default BookingRow;
