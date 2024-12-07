import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminUser = () => {
  const [userDetails, setUserDetails] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/admin/users", {
        withCredentials: true,
      });
      console.log(response.data.data.allUserDetails);
      if (response.status === 200) {
        setUserDetails(response.data.data.allUserDetails);
      }
    } catch (error) {
      console.error("Failed to get user details", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="admin-user-container">
      <h1 className="text-2xl font-bold text-center mb-6">User Details</h1>
      {userDetails ? (
        <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-gray-200 text-center">
            <tr>
              <th className="border border-gray-300 px-4 py-2">User Image</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Username</th>
              <th className="border border-gray-300 px-4 py-2">Phone Number</th>
              <th className="border border-gray-300 px-4 py-2">Email ID</th>
            </tr>
          </thead>
          <tbody>
            {userDetails.map((userInfo) => (
              <tr key={userInfo._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <img
                    src={userInfo.image}
                    alt={userInfo.name}
                    className="w-16 h-16 rounded-full mx-auto object-cover border border-gray-300"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">{userInfo.name}</td>
                <td className="border border-gray-300 px-4 py-2">{userInfo.username}</td>
                <td className="border border-gray-300 px-4 py-2">{userInfo.phone}</td>
                <td className="border border-gray-300 px-4 py-2">{userInfo.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-red-500 mt-6">No User Found!</p>
      )}
    </div>
  );
};

export default AdminUser;
