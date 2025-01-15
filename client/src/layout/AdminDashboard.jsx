import React, { useRef } from "react";
import { useUser } from "../components/userContext/userContext";
import { Outlet, useNavigate } from "react-router-dom";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import "./AdminDriver.css";

const AdminDashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const driverRef = useRef(
    new driver({
      showProgress: true,
      steps: [
        {
          element: "#welcome-message",
          popover: {
            title: "Welcome, Admin!",
            description:
              "This is your admin dashboard where you can manage everything.",
            side: "bottom",
          },
        },
        {
          element: "#users-btn",
          popover: {
            title: "Users Details",
            description: "Click here to view and manage user details.",
            side: "top",
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

  const startTour = () => {
    driverRef.current.drive();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Admin Header */}
      <header className="w-full bg-blue-600 text-white py-4 px-6 shadow-md fixed top-0 z-10">
        <h1 id="welcome-message" className="text-2xl font-bold text-center">
          Hello Admin{user ? ` ${user.name.toUpperCase()}` : ""}!
        </h1>
      </header>

      {/* Dashboard Layout */}
      <div className="flex flex-1 mt-16">
        {/* Sidebar for Larger Devices */}
        <aside className="hidden lg:flex flex-col bg-white shadow-md h-screen p-4 space-y-4 w-1/4 sticky top-16">
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
          <button
            onClick={startTour}
            className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-5 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            Start Tour
          </button>
        </aside>

        {/* Content Section */}
        <main className="flex-1 p-6">
          {/* Sidebar for Smaller Devices */}
          <div className="lg:hidden grid grid-cols-1 gap-4 mb-4">
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
            <button
              onClick={startTour}
              className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-5 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Start Tour
            </button>
          </div>

          {/* Main Content */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Admin Dashboard Content
            </h2>
            <p className="text-gray-600">
              Use the buttons to navigate through the admin panel and manage
              your data effectively.
            </p>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
