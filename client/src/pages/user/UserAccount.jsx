import axios from "axios";
import React, { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import UserNavbar from "../../components/Navbars/UserNavbar/UserNavbar";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
const UserAccount = () => {
  const [showUser, setShowUser] = useState(null); // Initial state is null
  const [menuOpen, setMenuOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const userDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/v1/user/${id}/account` , 
      {withCredentials: true});
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
    <UserNavbar/>
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 md:w-1/3 w-full p-6 flex items-center justify-center text-white">
        <div className="text-center space-y-6">
          {/* User Image */}
          {showUser && (
            <img
              src={showUser.image}
              alt={showUser.name}
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg mx-auto"
            />
          )}

          <h1 className="text-3xl font-bold">
            {showUser ? showUser.name.toUpperCase() : "User Name"}
          </h1>
          <p className="text-lg font-light">{showUser?.email || "User Email"}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white p-6 md:p-12">
        {showUser ? (
          <div className="max-w-4xl mx-auto">
            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              User Details
            </h2>

            {/* User Details */}
            <div className="space-y-6">
              <form className=" grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* User ID */}
                <div>
                  <label htmlFor="id" className="block text-sm font-medium text-gray-600">
                    User ID
                  </label>
                  <input
                    type="text"
                    id="id"
                    value={showUser._id}
                    readOnly
                    className="w-full  border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={showUser.name}
                    readOnly
                    className="w-full  border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Username */}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={showUser.username}
                    readOnly
                    className="w-full  border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    value={showUser.phone}
                    readOnly
                    className="w-full  border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={showUser.email}
                    readOnly
                    className="w-full  border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </form>

              {/* Action Buttons */}
              <div className="flex flex-col xs:flex-row xs:space-x-6 gap-4  justify-center mt-6">
                <button
                  onClick={() => navigate("edit")}
                  className=" flex items-center justify-center gap-4 bg-green-500 hover:bg-green-600 text-white  p-3 rounded-lg shadow-md transform hover:scale-105 transition-all"
                >
                  Edit Details
                  <FaEdit className="text-xl text-white "/>
                </button>
                <button
                  onClick={() => navigate("delete")}
                  className="flex items-center justify-center gap-4 bg-red-500 hover:bg-red-600 text-white  p-3 rounded-lg shadow-md transform hover:scale-105 transition-all"
                >
                  Delete Account
                  <MdDeleteForever className="text-xl text-white "/>
                </button>
              </div>
            </div>
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
