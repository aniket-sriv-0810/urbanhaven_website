import React from "react";
import { FaEdit } from "react-icons/fa";

const UserRow = ({ user }) => {
  return (
    <tr className="hover:bg-zinc-600 hover:text-white text-gray-800">
      <td className="border border-gray-200 px-4 py-2">
        <img
          src={user.image}
          alt={user.name}
          className="w-12 h-12 md:w-16 md:h-16 rounded-full mx-auto object-cover border border-gray-300"
        />
      </td>
      <td className="border border-gray-200 text-center px-4 py-2">{user.name}</td>
      <td className="border border-gray-200 text-center px-4 py-2">{user.username}</td>
      <td className="border border-gray-200 text-center px-4 py-2">{user.phone}</td>
      <td className="border border-gray-200 text-center px-4 py-2">{user.email}</td>
      <td className="border border-gray-200 px-4 py-2 text-center">
        <button className="flex items-center gap-x-3 bg-green-500 px-4 py-4 m-auto rounded-full text-white hover:bg-green-600 hover:scale-110 transition-colors">
          <FaEdit />
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
