import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserNavbar from "../../components/Navbars/UserNavbar/UserNavbar";
import UserProfile from "../../components/User/UserAccount/UserProfile";
import UserDetailsForm from "../../components/User/UserAccount/UserDetailsForm";
import UserActions from "../../components/User/UserAccount/UserActions";

const UserAccount = () => {
  const [showUser, setShowUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const userDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/v1/user/${id}/account`,
        { withCredentials: true }
      );
      setShowUser(response.data.data.userInfo);
    } catch (error) {
      console.error("Failed to get user", error);
    }
  };

  useEffect(() => {
    userDetails();
  }, [id]);

  return (
    <>
      <UserNavbar />
      <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row">
        {/* Sidebar - User Profile */}
        <UserProfile user={showUser} />

        {/* Main Content */}
        <div className="flex-1 bg-white p-6 md:p-12">
          {showUser ? (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                User Details
              </h2>

              {/* User Details Form */}
              <UserDetailsForm user={showUser} />

              {/* Action Buttons */}
              <UserActions navigate={navigate} />
            </div>
          ) : (
            <p className="text-gray-500 text-lg text-center">Loading user details...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserAccount;
