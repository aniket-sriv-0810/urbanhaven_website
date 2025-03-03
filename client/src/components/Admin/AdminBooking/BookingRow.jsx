import React from "react";

const BookingRow = ({ booking }) => {
  return (
    <tr className="hover:bg-zinc-600 hover:text-white text-gray-800">
      {/* Booked By */}
      <td className="border border-gray-300 px-4 py-2 text-center">
        {booking.userDetails?.name || "N/A"}
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        {booking.userDetails?.phone || "N/A"}
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        {booking.userDetails?.email || "N/A"}
      </td>

      {/* Hotel Details */}
      <td className="border border-gray-300 px-4 py-2 text-center">
        <img
          src={booking.hotelDetails?.image}
          alt={booking.hotelDetails?.title || "Hotel Image"}
          className="w-16 h-16 object-cover m-auto rounded-md border"
        />
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        {booking.hotelDetails?.title || "N/A"}
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        {booking.hotelDetails?.city || "N/A"}
      </td>

      {/* Dates */}
      <td className="border border-gray-300 px-4 py-2 text-center">
        {new Date(booking.checkInDate).toLocaleDateString()}
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        {new Date(booking.checkOutDate).toLocaleDateString()}
      </td>

      {/* Payment */}
      <td className="border border-gray-300 px-4 py-2 text-center">
        {booking.paymentDetails}
      </td>

      {/* Payment Status */}
      <td className="flex justify-center items-center mt-5">
        <button
          className={`border border-gray-300 px-4 py-2 text-center rounded-xl font-medium ${
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
    </tr>
  );
};

export default BookingRow;
