import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserDashBoard from "../components/UserDashBoard/UserDashBoard";
import { FaBars, FaTimes } from "react-icons/fa";

const UserAccount = () => {
  const [showUser, setShowUser] = useState(null); // Initial state is null
  const [menuOpen, setMenuOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const userDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/user/${id}/account`);
      setShowUser(response.data.data.userInfo);
    } catch (error) {
      console.error("Failed to get user", error);
    }
  };

  useEffect(() => {
    userDetails();
  }, [id]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row">
      {/* Header */}
      <div className="w-full md:hidden flex items-center justify-between bg-purple-700 p-4 text-white">
        <h1 className="text-xl font-bold">Welcome, User!</h1>
        <button
          className="text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Drawer for smaller devices */}
      <div
        className={`py-16 px-5 absolute top-0 right-0 h-fit bg-purple-600 text-white w-3/4 sm:w-1/2 lg:w-1/3 transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-50 md:hidden`}
      >
        <button
          className="absolute top-4 right-4 text-white text-2xl"
          onClick={() => setMenuOpen(false)}
        >
          <FaTimes />
        </button>
        <UserDashBoard closeMenu={() => setMenuOpen(false)} />
      </div>

      {/* Sidebar for medium and larger devices */}
      <div className="hidden md:block w-1/4 bg-purple-600 text-white p-4">
        <UserDashBoard />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white p-6 shadow-lg rounded-lg">
        {showUser ? (
          <>
            {/* User Image */}
            <img
              src={showUser.image}
              alt={showUser.name}
              className="w-32 h-32 rounded-full border-4 border-purple-500 shadow-md mb-6 mx-auto"
            />

            {/* User Details */}
            <ul className="w-full  lg:w-3/4 mx-auto bg-gray-200 p-6 rounded-lg shadow-md text-center space-y-4">
              <li>
                <strong>ID:</strong> {showUser._id}
              </li>
              <li>
                <strong>Name:</strong> {showUser.name.toUpperCase()}
              </li>
              <li>
                <strong>Username:</strong> {showUser.username}
              </li>
              <li>
                <strong>Phone:</strong> {showUser.phone}
              </li>
              <li>
                <strong>Email:</strong> {showUser.email}
              </li>
            </ul>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-6 justify-center">
              <button
                onClick={() => navigate("edit")}
                className=" bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md"
              >
                Edit Details
              </button>
              <button
                onClick={() => navigate("delete")}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-md"
              >
                Delete Account
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-lg">Loading user details...</p>
        )}
      </div>
    </div>
  );
};

export default UserAccount;
