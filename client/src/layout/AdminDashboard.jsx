import React, { useRef } from "react";
import { useUser } from "../components/userContext/userContext";
import { Outlet, useNavigate } from "react-router-dom";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import "./AdminDriver.css";
import AdminNavbar from "../components/AdminNavbar/AdminNavbar";

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
    <>
    <AdminNavbar/>
    <div className="min-h-screen bg-gray-100 flex flex-col">
 

     
       
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
        
      </div>
    
    </>
  );
};

export default AdminDashboard;
