import React, { useEffect, useRef } from "react";
import { useUser } from "../components/userContext/userContext";
import { Outlet, useNavigate } from "react-router-dom";
import {driver} from 'driver.js';
import "driver.js/dist/driver.css";
import './AdminDriver.css';
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
            backgroundColor: "purple"
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
    <div>
      <h1
        id="welcome-message"
        className="text-3xl text-black text-center font-bold"
      >
        Hello Admin @{user ? ` ${user.name.toUpperCase()} !` : "!"}
      </h1>
      <br />
      <br />
      <div className="flex gap-5 mx-4 mb-10 justify-center">
        <button
          id="users-btn"
          onClick={() => navigate("users")}
          className="bg-green-500 px-4 py-2 text-white border-gray-900 rounded-lg"
        >
          Users Details
        </button>
        <button
          id="hotels-btn"
          onClick={() => navigate("hotels")}
          className="bg-orange-500 px-4 py-2 rounded-lg text-white"
        >
          Hotels Details
        </button>
        <button
          id="new-hotel-btn"
          onClick={() => navigate("new-hotel")}
          className="bg-purple-600 px-4 py-2 rounded-lg text-white"
        >
          Create New Hotel
        </button>
        <button
          id="contacts-btn"
          disabled
          onClick={() => navigate("contacts")}
          className="bg-gray-500 px-4 py-2 rounded-lg text-white"
        >
          Contacts Details
        </button>
      </div>

      {/* Tour Start Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={startTour}
          className="bg-blue-500 px-4 py-2 rounded-lg text-white"
        >
          Start Dashboard Tour
        </button>
      </div>

      <Outlet />
    </div>
  );
};

export default AdminDashboard;
