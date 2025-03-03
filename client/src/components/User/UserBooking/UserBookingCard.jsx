import React from "react";
const UserBookingCard = ({ booking }) => {
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
      </div>
    );
  };
  
  export default UserBookingCard;
  