import axios from "axios";
import React, { useEffect, useState } from "react";
import UserTable from "../components/Admin/AdminUser/UserTable";
import SkeletonTable from "../components/LoadingSkeleton/SkeletonTable";
const AdminUser = () => {
  const [userDetails, setUserDetails] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/v1/admin/users`,
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
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-3xl font-semibold text-center pt-5 mb-6 text-gray-800">
        User Details
      </h1>
      {userDetails ? <UserTable users={userDetails} /> : (
        <p className="text-center text-red-500 mt-6"><SkeletonTable/></p>
      )}
    </div>
  );
};

export default AdminUser;
