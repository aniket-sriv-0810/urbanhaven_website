import React, { useRef } from "react";
import { useUser } from "../components/userContext/userContext";
import { Outlet, useNavigate } from "react-router-dom";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import "./AdminDriver.css";

const AdminDashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  // Driver.js configuration
  const driverRef = useRef(
    new driver({
      showProgress: true,
      steps: [
        {
          element: "#welcome-message",
          popover: {
            title: "Welcome, Admin!",
            description: "This is your admin dashboard where you can manage everything.",
            side: "bottom",
          },
        },
        {
          element: "#users-btn",
          popover: {
            title: "Users Details",
            description: "Click here to view and manage user details.",
            side: "top",
            backgroundColor: "purple",
          },
        },
        {
          element: "#hotels-btn",
          popover: {
            title: "Hotels Details",
            description: "Click here to view and manage hotel details.",
            side: "top",
          },
        },
        {
          element: "#new-hotel-btn",
          popover: {
            title: "Create New Hotel",
            description: "Click here to create a new hotel listing.",
            side: "top",
          },
        },
        {
          element: "#contacts-btn",
          popover: {
            title: "Contacts",
            description: "View contact details here (disabled for now).",
            side: "top",
          },
        },
      ],
    })
  );

  // Start the tour
  const startTour = () => {
    driverRef.current.drive();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-6 py-8">
      <h1
        id="welcome-message"
        className="text-3xl md:text-4xl lg:text-5xl text-gray-800 text-center font-bold mb-6"
      >
        Hello Admin{user ? ` ${user.name.toUpperCase()}!` : "!"}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl">
        <button
          id="users-btn"
          onClick={() => navigate("users")}
          className="bg-green-500 hover:bg-green-600 text-white py-3 px-5 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Users Details
        </button>
        <button
          id="hotels-btn"
          onClick={() => navigate("hotels")}
          className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-5 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Hotels Details
        </button>
        <button
          id="new-hotel-btn"
          onClick={() => navigate("new-hotel")}
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-5 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Add New Hotel
        </button>
        <button
          id="contacts-btn"
          className="bg-red-500 text-white py-3 px-5 rounded-lg shadow-md opacity-50 cursor-not-allowed"
        >
          Contact Us
        </button>
      </div>

      <button
        onClick={startTour}
        className="mt-6 py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
      >
        Start Tour
      </button>

      <Outlet />
    </div>
  );
};

export default AdminDashboard;
