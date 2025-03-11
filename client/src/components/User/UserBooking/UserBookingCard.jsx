import React, { useState } from "react";
import axios from "axios";
import { FaHotel, FaCalendarAlt, FaUserFriends, FaBed, FaRupeeSign, FaTimes, FaCheckCircle, FaFileInvoice } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";

const UserBookingCard = ({ booking, onCancel }) => {
  const [loading, setLoading] = useState(false);
console.log("booking status => " , booking.status);

  const handleCancelBooking = async () => {
    if (booking.status === "Cancelled") return;

    setLoading(true);
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/v1/user/${booking.userDetails}/account/booking/${booking._id}/cancel`,
        { withCredentials: true }
      );

      onCancel(booking._id); // Notify parent component
    } catch (error) {
      console.error("Error cancelling booking:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white w-full sm:w-96 shadow-lg rounded-xl p-5 hover:shadow-xl transition-all border border-gray-200 shadow-gray-600 hover:shadow-gray-500 hover:scale-105">
      {/* Hotel Image */}
      <div className="relative">
        <img
          src={booking.hotelDetails?.image || "https://via.placeholder.com/300"}
          alt={booking.hotelDetails?.title || "Hotel"}
          className="w-full h-56 object-cover rounded-lg"
        />
        <span
          className={`absolute top-3 right-3 px-3 py-1 text-sm font-semibold rounded-full shadow-md ${
            booking.status == "Pending"
              ? "bg-green-600 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {booking.status == "Pending" ? "Confirmed" : "Cancelled"}
        </span>
      </div>

      {/* Hotel Title & Price */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <FaHotel className="text-gray-500" /> {booking.hotelDetails?.title || "No Title Available"}
        </h3>
        <p className="text-gray-700 flex items-center gap-1 mt-2">
         <span className="font-normal"> Total Amount : </span> <FaRupeeSign className="text-sm text-green-700 font-normal" />
          <span className="-ml-1 font-semibold text-green-700">
         {(booking.totalAmount).toLocaleString("INR") || "N/A"} 
         </span>
        </p>
      </div>

      {/* Booking Details */}
      <div className="mt-4 space-y-2 text-gray-700">
        <p className="flex items-center gap-2 text-sm">
          <FaCalendarAlt className="text-gray-500" /> <span className="font-medium">Check-in:</span>{" "}
          {new Date(booking.checkInDate).toLocaleDateString("en-IN")} →{" "}
          <span className="font-medium">Check-out:</span>{" "}
          {new Date(booking.checkOutDate).toLocaleDateString("en-IN")}
        </p>
        <p className="flex items-center gap-2 text-sm">
          <FaBed className="text-gray-500" /> Rooms: {booking.room} |{" "}
          <FaUserFriends className="text-gray-500" /> Adults: {booking.adultCount} | Infants:{" "}
          {booking.infantCount}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-5  flex flex-col justify-center items-center gap-3">
        {/* View Confirmation Button */}
        <Link
          to={`/booking/${booking._id}`}
          className="w-80 text-sm flex items-center justify-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-blue-700 to-teal-600 hover:scale-110 rounded-lg font-medium transition-all shadow-sm"
        >
          <FaFileInvoice className="text-lg" /> View Confirmation
        </Link>

        {/* Cancel Booking Button */}
        <button
          onClick={handleCancelBooking}
          disabled={booking.status === "Cancelled" || loading}
          className={`w-80 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all shadow-sm ${
            booking.status === "Cancelled"
              ? "  cursor-not-allowed text-white"
              : "bg-gradient-to-r from-red-600 to-purple-800  hover:scale-110 text-white"
          }`}
        >
         <MdDeleteForever className="text-lg"/> {loading ?  <>
            <span className="animate-pulse flex items-center gap-3 text-white">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Cancelling...</span>
          </> : booking.status === "Cancelled" ? "Cancelled" : "Cancel Booking"}
        </button>
      </div>
    </div>
  );
};

export default UserBookingCard;
