import React from "react";
import HotelRow from "./HotelRow";

const HotelTable = ({ hotels }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="bg-gray-800 text-white text-sm lg:text-base">
          <tr>
            <th className="border border-gray-200 px-4 py-3 font-medium text-center">Hotel Image</th>
            <th className="border border-gray-200 px-4 py-3 font-medium text-center">Title</th>
            <th className="border border-gray-200 px-4 py-3 font-medium text-center">Price</th>
            <th className="border border-gray-200 px-4 py-3 font-medium text-center">City</th>
            <th className="border border-gray-200 px-4 py-3 font-medium text-center">State</th>
            <th className="border border-gray-200 px-4 py-3 font-medium text-center">Country</th>
            <th className="border border-gray-200 px-4 py-3 font-medium text-center">Edit Details</th>
            <th className="border border-gray-200 px-4 py-3 font-medium text-center">Delete Hotel</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <HotelRow key={hotel._id} hotel={hotel} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HotelTable;
