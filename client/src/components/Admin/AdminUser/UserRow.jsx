import React from "react";
import { MdDeleteForever } from "react-icons/md";

const UserRow = ({  user, loggedInUser, deleteUser  }) => {
  const isCurrentUser = loggedInUser?._id === user._id;
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
      <button
          onClick={() => deleteUser(user._id)}
          disabled={isCurrentUser} // Disable if user is logged-in user
          className={`flex items-center gap-x-3 px-4 py-4 m-auto rounded-full text-white transition-colors 
            ${isCurrentUser ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 hover:scale-110"}`}
        >
          <MdDeleteForever/>
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
