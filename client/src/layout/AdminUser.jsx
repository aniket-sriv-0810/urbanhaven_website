import axios from "axios";
import React, { useEffect, useState } from "react";
import UserTable from "../components/Admin/AdminUser/UserTable";
import SkeletonTable from "../components/LoadingSkeleton/SkeletonTable";
import { useUser } from "../components/userContext/userContext.jsx";
import { useNavigate } from "react-router-dom";

const AdminUser = () => {
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to store error message
  const navigate = useNavigate();

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
      console.error("Failed to get user details:", error);
      setError(error.response?.data?.message || "Failed to fetch user details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/v1/user/${userId}/account/delete`, {
        withCredentials: true,
      });
      setUserDetails((prevUsers) => prevUsers.filter((u) => u._id !== userId)); // Update state after deletion
      navigate('/delete/successfully');
    } catch (error) {
      console.error("Error in deleting user:", error);
      setError(error.response?.data?.message || "Failed to delete user. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-3xl font-semibold text-center pt-5 mb-6 text-gray-800">
        User Details
      </h1>

      {loading ? (
        <div className="text-center text-gray-700">
          <SkeletonTable />
        </div>
      ) : error ? (
        <p className="text-center text-red-500 font-semibold mt-10">{error}</p>
      ) : userDetails && userDetails.length > 0 ? (
        <UserTable users={userDetails} loggedInUser={user} deleteUser={deleteUser} />
      ) : (
        <p className="text-center text-red-500 mt-6">No User Details Found!</p>
      )}
    </div>
  );
};

export default AdminUser;
