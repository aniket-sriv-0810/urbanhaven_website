import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminUser = () => {
  const [userDetails, setUserDetails] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/admin/users",
        { withCredentials: true }
      );
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
    <div className="admin-user-container min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        User Details
      </h1>
      {userDetails ? (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-blue-600 text-white text-sm lg:text-base">
              <tr>
                <th className="border border-gray-200 px-4 py-3 text-left">
                  User Image
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left">
                  Name
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left">
                  Username
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left">
                  Phone Number
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left">
                  Email ID
                </th>
              </tr>
            </thead>
            <tbody>
              {userDetails.map((userInfo) => (
                <tr
                  key={userInfo._id}
                  className="hover:bg-gray-100 text-gray-800"
                >
                  <td className="border border-gray-200 px-4 py-2">
                    <img
                      src={userInfo.image}
                      alt={userInfo.name}
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full mx-auto object-cover border border-gray-300"
                    />
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {userInfo.name}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {userInfo.username}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {userInfo.phone}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {userInfo.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-red-500 mt-6">No User Found!</p>
      )}
    </div>
  );
};

export default AdminUser;
