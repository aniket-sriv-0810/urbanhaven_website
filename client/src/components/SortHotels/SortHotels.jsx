import React from "react";
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";

const SortHotels = ({ sortOrder, setSortOrder, sortHotels }) => {
  return (
    <div className="flex justify-center items-center my-8">
      <div className="relative inline-block">
        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            sortHotels(e.target.value);
          }}
          className="appearance-none border-2 border-gray-300 bg-white py-2 pl-4 pr-10 rounded-lg shadow-md text-gray-700 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:border-blue-500 transition-all duration-300"
        >
          <option value="default">Sort by</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
          {sortOrder === "lowToHigh" ? (
            <FaSortAmountDown className="text-blue-500" />
          ) : sortOrder === "highToLow" ? (
            <FaSortAmountUp className="text-red-500" />
          ) : (
            <FaSortAmountDown />
          )}
        </div>
      </div>
    </div>
  );
};

export default SortHotels;
