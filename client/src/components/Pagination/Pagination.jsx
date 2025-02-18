import React from "react";

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <div className="flex justify-center my-40">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`px-4 py-2 mx-2 rounded-full ${
            index + 1 === currentPage ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
          } hover:bg-gray-400 hover:text-white`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
