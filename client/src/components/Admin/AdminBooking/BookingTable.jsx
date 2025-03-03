import React from "react";
import BookingRow from "./BookingRow";

const BookingTable = ({ bookings }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-800 text-white text-sm lg:text-base">
          <tr>
            <th colSpan="3" className="border border-gray-300 px-4 py-3">Booked By</th>
            <th colSpan="3" className="border border-gray-300 px-4 py-3">Hotel Details</th>
            <th rowSpan="2" className="border border-gray-300 px-4 py-3">Check-in Date</th>
            <th rowSpan="2" className="border border-gray-300 px-4 py-3">Check-out Date</th>
            <th rowSpan="2" className="border border-gray-300 px-4 py-3">Payment Mode</th>
            <th rowSpan="2" className="border border-gray-300 px-4 py-3">Payment Status</th>
          </tr>
          <tr>
            <th className="border border-gray-300 px-4 py-3">Name</th>
            <th className="border border-gray-300 px-4 py-3">Phone</th>
            <th className="border border-gray-300 px-4 py-3">Email</th>
            <th className="border border-gray-300 px-4 py-3">Image</th>
            <th className="border border-gray-300 px-4 py-3">Title</th>
            <th className="border border-gray-300 px-4 py-3">City</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <BookingRow key={booking._id} booking={booking} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
