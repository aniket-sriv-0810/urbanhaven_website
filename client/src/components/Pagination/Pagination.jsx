import React from "react";

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  if (totalPages <= 1) return null; // Hide pagination if only one page

  return (
    <div className="flex justify-center items-center flex-wrap gap-4 space-x-2 my-10">


      {/* Page Numbers */}
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`px-4 py-2 rounded-full transition duration-300 ${
            index + 1 === currentPage
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-400 hover:text-white"
          }`}
        >
          {index+1}
        </button>
      ))}


    </div>
  );
};

export default Pagination;
