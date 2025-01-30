import React, { useRef , useEffect} from "react";
import { useUser } from "../components/userContext/userContext";
import { Outlet, useNavigate } from "react-router-dom";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import "./AdminDriver.css";
import AdminNavbar from "../components/AdminNavbar/AdminNavbar";
import { FaUserShield, FaIdBadge, FaPhone, FaEnvelope } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

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
useEffect(() => {
    AOS.init({
       // Start animation after scrolling 100px
      duration: 1500, // Animation duration
      easing: "ease-in-out", // Smooth effect
      mirror:true,
      once: false, // Animation repeats on scroll
    });
  }, []);
  return (
    <>
    <AdminNavbar/>
    <div className= "mt-10 min-h-screen  flex flex-col">

          {/* Main Content */}
          <div className=" bg-white shadow-lg rounded-xl p-6 md:p-8 lg:p-10 max-w-3xl mx-auto">
      {/* Header Section */}
      <div className=" flex items-center gap-4 mb-6">
        <FaUserShield className="text-blue-600 text-3xl" />
        <h2 className="  text-3xl font-bold text-gray-900">Admin Credentials</h2>
      </div>

      {/* Admin Info */}
      <div className=" bg-gray-100 p-5 rounded-lg shadow-md space-y-4">
        <div className=" flex items-center gap-3 text-lg text-gray-800">
          <FaIdBadge className="text-blue-500" />
          <span><strong>Admin ID:</strong> {user._id}</span>
        </div>

        <div className="flex items-center gap-3 text-lg text-gray-800">
          <FaUserShield className="text-green-500" />
          <span><strong>Admin Name:</strong> {user.name}</span>
        </div>

        <div className="flex items-center gap-3 text-lg text-gray-800">
          <FaPhone className="text-red-500" />
          <span><strong>Phone:</strong> {user.phone}</span>
        </div>

        <div className="flex items-center gap-3 text-lg text-gray-800">
          <FaEnvelope className="text-yellow-500" />
          <span><strong>Email:</strong> {user.email}</span>
        </div>
      </div>
    </div>
    <div data-aos="fade-up">
          <Outlet />
  </div>
      </div>

    </>
  );
};

export default AdminDashboard;
