import React, { useRef, useEffect, useState } from "react";
import { useUser } from "../components/userContext/userContext";
import { NavLink, useNavigate } from "react-router-dom";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import "./AdminDriver.css";
import {
  FaUserShield,
  FaIdBadge,
  FaPhoneAlt,
  FaEnvelope,
  FaHotel,
  FaUsers,
  FaClipboardList,
  FaComments,
} from "react-icons/fa";
import { IoMdHelpCircle } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
const AdminDashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({
    totalHotels: 0,
    totalUsers: 0,
    totalBookings: 0,
    totalContacts: 0,
  });

  const driverRef = useRef(
    new driver({
      showProgress: true,
      overlayColor: "rgba(0, 0, 0, 0.7)", // Dark background for focus effect
      popoverClass: "custom-driver-popover", // Custom styling class
      animate: true,
      steps: [
        {
          element: "#welcome-message",
          popover: {
            title: "Welcome, Admin! 🚀",
            description:
              "Manage your dashboard, view users, hotels, and bookings easily.",
            side: "bottom",
          },
        },
        {
          element: "#users-btn",
          popover: {
            title: "Users Section 👥",
            description: "View and manage all registered users here.",
            side: "top",
          },
        },
        {
          element: "#hotels-btn",
          popover: {
            title: "Hotels Section 🏨",
            description: "Manage hotel listings and create new ones.",
            side: "top",
          },
        },
        {
          element: "#bookings-btn",
          popover: {
            title: "Bookings 📋",
            description: "Check all confirmed hotel bookings here.",
            side: "top",
          },
        },
        {
          element: "#contacts-btn",
          popover: {
            title: "Feedbacks & Contacts 💬",
            description: "View user feedback and contact requests.",
            side: "top",
          },
        },
      ],
    })
  );

  const startTour = () => {
    driverRef.current.drive();
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/v1/admin/`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setAdminData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-slate-300 to-gray-300 py-10 px-5 sm:px-20">
        {/* Admin Welcome Section */}
        <div
          className="bg-gray-100 shadow-lg shadow-gray-400 rounded-xl p-6 md:p-8 max-w-3xl mx-auto"
          data-aos="fade-up"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <FaUserShield className="text-blue-600 text-4xl" />
            <h2 className="text-3xl  font-bold text-gray-900">
              Admin Credentials
            </h2>
            <NavLink to="/">
              <button className=" flex gap-3 rounded-full m-3 text-white bg-gradient-to-r from-cyan-500 to-purple-900  p-4 font-semibold  shadow-lg hover:opacity-90 transition-all duration-300 ease-in-out transform hover:scale-110">
                <IoHome className="text-xl" />
              </button>
            </NavLink>
          </div>

          {/* Admin Info */}
          <div className="bg-gray-100 p-5 rounded-lg shadow-md space-y-4">
            <div className="flex items-center gap-3 text-lg text-gray-800">
              <FaIdBadge className="text-blue-500" />
              <span>
                <strong>Admin ID:</strong> <span>{user._id}</span>
              </span>
            </div>

            <div className="flex items-center gap-3 text-lg text-gray-800">
              <FaUserShield className="text-green-500" />
              <span>
                <strong>Admin:</strong> {user.name}
              </span>
            </div>

            <div className="flex items-center gap-3 text-lg text-gray-800">
              <FaPhoneAlt className="text-red-500" />
              <span>
                <strong>Phone:</strong> {user.phone}
              </span>
            </div>

            <div className="flex items-center gap-3 text-lg text-gray-800">
              <FaEnvelope className="text-yellow-500" />
              <span>
                <strong>Email:</strong> {user.email}
              </span>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {/* Hotels */}
          <div
            className="bg-white shadow-lg  p-6 rounded-2xl flex flex-col items-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl  hover:shadow-slate-500  mx-auto w-64"
            data-aos="zoom-in"
          >
            <div className="bg-cyan-100 p-4 rounded-full shadow-md">
              <FaHotel className="text-blue-600 text-5xl" />
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-4">
              {adminData.totalHotels}
            </h2>
            <p className="text-gray-600 text-lg font-medium">Hotels Listed</p>
            <NavLink to="/admin/hotels">
              <button className="rounded-2xl m-3 text-white bg-gradient-to-r from-cyan-500 to-purple-900 hover:from-green-500 hover:to-emerald-700 px-8 py-3 font-semibold shadow-lg hover:opacity-90 transition-all duration-300 ease-in-out transform hover:scale-110">
                View Hotels
              </button>
            </NavLink>
          </div>

          <div
            className="bg-white shadow-lg p-6 rounded-2xl flex flex-col items-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:shadow-slate-500 mx-auto w-64"
            data-aos="zoom-in"
          >
            <div className="bg-emerald-100 p-4 rounded-full shadow-md">
              <FaUsers className="text-green-500 text-5xl" />
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-4">
              {adminData.totalUsers}
            </h2>
            <p className="text-gray-600 text-lg font-medium">
              Users Registered
            </p>
            <NavLink to="/admin/users">
              <button className="rounded-2xl m-3 text-white bg-gradient-to-r from-cyan-500 to-purple-900 hover:from-green-500 hover:to-emerald-700 px-8 py-3 font-semibold shadow-lg hover:opacity-90 transition-all duration-300 ease-in-out transform hover:scale-110">
                View Users
              </button>
            </NavLink>
          </div>

          {/* Bookings */}

          <div
            className="bg-white shadow-lg p-6 rounded-2xl flex flex-col items-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:shadow-slate-500  mx-auto w-64"
            data-aos="zoom-in"
          >
            <div className="bg-red-100 p-4 rounded-full shadow-md">
              <FaClipboardList className="text-red-500 text-5xl" />
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-4">
              {adminData.totalBookings}
            </h2>
            <p className="text-gray-600 text-lg font-medium">
              Bookings Confirmed
            </p>
            <NavLink to="/admin/bookings">
              <button className="rounded-2xl m-3 text-white bg-gradient-to-r from-cyan-500 to-purple-900 hover:from-green-500 hover:to-emerald-700 px-8 py-3 font-semibold shadow-lg hover:opacity-90 transition-all duration-300 ease-in-out transform hover:scale-110">
                View Bookings
              </button>
            </NavLink>
          </div>

          {/* Contacts */}

          <div
            className="bg-white shadow-lg p-6 rounded-2xl flex flex-col items-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:shadow-slate-500 mx-auto w-64"
            data-aos="zoom-in"
          >
            <div className="bg-orange-100 p-4 rounded-full shadow-md">
              <FaComments className="text-orange-500 text-5xl" />
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-4">
              {adminData.totalContacts}
            </h2>
            <p className="text-gray-600 text-lg font-medium">
              Feedbacks Received
            </p>
            <NavLink to="/admin/contacts">
              <button className="rounded-2xl m-3 text-white bg-gradient-to-r from-cyan-500 to-purple-900 hover:from-green-500 hover:to-emerald-700 px-8 py-3 font-semibold shadow-lg hover:opacity-90 transition-all duration-300 ease-in-out transform hover:scale-110">
                View Contacts
              </button>
            </NavLink>
          </div>
        </div>
       {/* Tour Help Button */}
        <button
          onClick={startTour}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 bg-white hover:to-blue-500 text-white p-2 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 flex items-center justify-center"
        >
          <IoMdHelpCircle className="w-8 h-8 text-blue-500 md:w-10 md:h-10" />
        </button>

        </div>
    </>
  );
};

export default AdminDashboard;
