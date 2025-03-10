import React, { useState } from "react";
import axios from "axios";

const UserBookingCard = ({ booking, onCancel }) => {
  const [loading, setLoading] = useState(false);

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
    <div className="bg-white shadow-lg rounded-xl p-4 hover:shadow-2xl transition-all">
      <img
        src={booking.hotelDetails?.image || "https://via.placeholder.com/300"}
        alt={booking.hotelDetails?.title || "Hotel"}
        className="w-full h-40 object-cover rounded-lg"
      />
      <h3 className="text-xl font-semibold mt-3 text-gray-900">
        {booking.hotelDetails?.title || "No Title Available"}
      </h3>
      <p className="text-gray-900 font-bold mt-1">
        ₹{booking.hotelDetails?.price || "N/A"} per night
      </p>
      <p className="text-gray-600 mt-1">
        Check-in: <span className="font-semibold">{new Date(booking.checkInDate).toLocaleDateString("en-IN")}</span> → 
        Check-out: <span className="font-semibold">{new Date(booking.checkOutDate).toLocaleDateString("en-IN")}</span>
      </p>
      <p className="text-gray-700 mt-1">
        Rooms: {booking.room} | Adults: {booking.adultCount} | Infants: {booking.infantCount}
      </p>
      <span
        className={`mt-3 inline-block px-3 py-1 text-sm font-semibold rounded-full ${
          booking.status === "Confirmed"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-600"
        }`}
      >
        {booking.status}
      </span>

      {/* Cancel Button */}
      <button
        onClick={handleCancelBooking}
        disabled={booking.status === "Cancelled" || loading}
        className={`mt-3 w-full px-4 py-2 text-white rounded ${
          booking.status === "Cancelled"
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-600"
        }`}
      >
        {loading ? "Cancelling..." : booking.status === "Cancelled" ? "Cancelled" : "Cancel Booking"}
      </button>
    </div>
  );
};

export default UserBookingCard;
