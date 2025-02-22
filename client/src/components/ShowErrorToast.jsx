import React from "react";
import { BiErrorCircle } from "react-icons/bi";

const ShowErrorToast = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 sm:w-96">
        <div className="flex items-center justify-center text-red-600 text-2xl font-semibold">
          <h2>Error</h2>
          <BiErrorCircle className="ml-2" />
        </div>
        <p className="mt-2 text-sm text-gray-700">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ShowErrorToast;
