import React from "react";
import UserRow from "./UserRow";

const UserTable = ({ users, loggedInUser, deleteUser  }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="bg-gray-800 text-white text-sm lg:text-base">
          <tr>
            <th className="border border-gray-200 px-4 py-3 font-medium text-center">User Image</th>
            <th className="border border-gray-200 px-4 py-3 font-medium text-center">Name</th>
            <th className="border border-gray-200 px-4 py-3 font-medium text-center">Username</th>
            <th className="border border-gray-200 px-4 py-3 font-medium text-center">Phone Number</th>
            <th className="border border-gray-200 px-4 py-3 font-medium text-center">Email ID</th>
            <th className="border border-gray-200 px-4 py-3 font-medium text-center">Delete Account</th>
          </tr>
        </thead>
        <tbody>
        {users.map((user) => (
            <UserRow key={user._id} user={user} loggedInUser={loggedInUser} deleteUser={deleteUser} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
