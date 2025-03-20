import React, { useRef, useEffect, useState } from "react";
import { useUser } from "../components/userContext/userContext";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { IoMdHelpCircle } from "react-icons/io";
import AdminStat from "../components/Admin/AdminDashboard/AdminStat";
import AdminInfo from "../components/Admin/AdminDashboard/AdminInfo";

const AdminDashboard = () => {
  const { user } = useUser();
  const [adminData, setAdminData] = useState({
    totalHotels: 0,
    totalUsers: 0,
    totalBookings: 0,
    totalContacts: 0,
  });

  const driverRef = useRef(null);

  useEffect(() => {
    // Fetch Admin Data
    axios
    .get(`${import.meta.env.VITE_API_URL}/v1/admin/`, { withCredentials: true })
    .then((response) => {
      console.log("Admin Data:", response);
      setAdminData(response.data.data);
    })
    .catch((error) => console.error("Error fetching data:", error));
  
  }, []);

  useEffect(() => {
    // Initialize AOS animations
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  useEffect(() => {
    // Initialize Driver.js for tour guide
    const driverInstance = new driver({
      showProgress: true,
      overlayColor: "rgba(0, 0, 0, 0.7)",
      popoverClass: "custom-driver-popover",
      animate: true,
      steps: [
        {
          element: "#admin-details",
          popover: {
            title: "Welcome, Admin! 🚀",
            description: "Manage users, hotels, bookings & more!",
            side: "bottom",
          },
        },
        {
          element: "#hotel-details",
          popover: {
            title: "Hotels 🏨",
            description: "Manage hotel listings",
            side: "top",
          },
        },
        {
          element: "#users-btn",
          popover: {
            title: "Users Section 👥",
            description: "Manage registered users",
            side: "top",
          },
        },
        {
          element: "#bookings-btn",
          popover: {
            title: "Bookings 📋",
            description: "View confirmed bookings",
            side: "top",
          },
        },
        {
          element: "#contacts-btn",
          popover: {
            title: "Feedback 💬",
            description: "View user feedback",
            side: "top",
          },
        },
      ],
    });

    driverRef.current = driverInstance;

    return () => {
      driverRef.current = null; // Cleanup
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-400 py-10 px-1 sm:px-20">
      {/* Admin Info Section */}
      <AdminInfo user={user} />

      {/* Admin Stats Section */}
      <AdminStat adminData={adminData} />

      {/* Help / Tour Button */}
      <button
        onClick={() => driverRef.current?.drive()}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-5 bg-white p-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
      >
        <IoMdHelpCircle className="w-8 h-8 text-blue-500 md:w-10 md:h-10" />
      </button>
    </div>
  );
};

export default AdminDashboard;