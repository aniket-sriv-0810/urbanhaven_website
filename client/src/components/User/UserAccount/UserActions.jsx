import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const UserActions = ({ navigate }) => {
  return (
    <div className="flex flex-col xs:flex-row xs:space-x-6 gap-6 justify-center mt-6" data-aos="fade-down">
      <button
        onClick={() => navigate("edit")}
        className="flex items-center justify-center gap-4 bg-gradient-to-t from-green-500 to-teal-600  text-white py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all"
      >
        Edit Details
        <FaEdit className="text-xl text-white" />
      </button>
      <button
        onClick={() => navigate("delete")}
        className="flex items-center justify-center gap-4 bg-gradient-to-r from-red-600 to-purple-600  text-white p-3  rounded-lg shadow-md transform hover:scale-105 transition-all"
      >
        Delete Account
        <MdDeleteForever className="text-xl text-white" />
      </button>
    </div>
  );
};

export default UserActions;
