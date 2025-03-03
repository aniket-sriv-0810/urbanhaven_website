import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const UserActions = ({ navigate }) => {
  return (
    <div className="flex flex-col xs:flex-row xs:space-x-6 gap-4 justify-center mt-6">
      <button
        onClick={() => navigate("edit")}
        className="flex items-center justify-center gap-4 bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg shadow-md transform hover:scale-105 transition-all"
      >
        Edit Details
        <FaEdit className="text-xl text-white" />
      </button>
      <button
        onClick={() => navigate("delete")}
        className="flex items-center justify-center gap-4 bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg shadow-md transform hover:scale-105 transition-all"
      >
        Delete Account
        <MdDeleteForever className="text-xl text-white" />
      </button>
    </div>
  );
};

export default UserActions;
