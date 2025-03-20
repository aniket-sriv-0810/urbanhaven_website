import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHotel , FaUser, FaPaperPlane } from "react-icons/fa";
import { FaBars, FaTimes , FaPowerOff } from "react-icons/fa";
import {  RiShieldUserLine } from "react-icons/ri";
import { MdAdminPanelSettings, MdEditCalendar , MdOutlinePostAdd   } from "react-icons/md";
import { BsBuildingFillAdd } from "react-icons/bs";
import { PiUserCirclePlusBold } from "react-icons/pi";
import { useUser } from "../../userContext/userContext";
const AdminMobile = ({ isMenuOpen, toggleMenu }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  const menuItems = [
    { to: "/admin", label: "Admin Dashboard", icon: <MdAdminPanelSettings />, role: "admin" },
    { to: "users", label: "All User Details", icon: <FaUser /> },
    { to: "hotels", label: "All Hotel Details", icon: <FaHotel /> },
    { to: "bookings", label: "Booking Details", icon: <MdEditCalendar /> },
    { to: "contacts", label: "Feedback Details", icon: <FaPaperPlane /> },
    { to: "new-hotel", label: "Add New Hotels", icon: <BsBuildingFillAdd /> },
    { to: "new-blog", label: "Add New Blogs", icon: <MdOutlinePostAdd  /> },
  ];

  return (
    <>
        <button className="absolute  right-3 lg:hidden focus:outline-none z-50 sm:absolute sm:right-5 " data-aos="fade-left" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      {/* Mobile Menu */}
      {isMenuOpen && (
    <div className ="absolute top-0 right-0 w-full h-max text-white z-50 bg-gradient-to-t from-zinc-800 to-gray-900 p-6 shadow-lg transition-all duration-300">
      {/* Close Button */}
      <button className="absolute  top-5 right-7 hover:text-red-500 text-white" onClick={toggleMenu}>
        <FaTimes size={28} />
      </button>

      {/* Navigation Links */}
      <ul className="mt-16 space-y-8  text-lg sm:text-xl flex flex-col items-center">
        {menuItems.map(({ to, label, icon, role }) =>
          (!role || user?.role === role) && (
            <li key={to} className="opacity-80 flex items-center justify-center p-2.5 gap-3 bg-gray-800 rounded-2xl w-80 hover:text-yellow-400">
              {icon}
              <NavLink to={to} onClick={toggleMenu}>{label}</NavLink>
            </li>
          )
        )}


        {/* Authentication Buttons */}
        {user ? (
          <button
            onClick={() => navigate("/user/logout")}
            className="bg-red-500 px-4 py-2 rounded-full w-48 hover:bg-red-600 flex  justify-center items-center gap-3"
          >
            Logout <FaPowerOff className="text-white w-5 h-5" />
          </button>
        ) : (
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => navigate("/user/login")}
              className="bg-green-500 px-4 py-2 rounded-lg w-40 hover:bg-green-600 flex justify-center items-center gap-2"
            >
              Login <RiShieldUserLine className="text-white w-5 h-5" />
            </button>
            <button
              onClick={() => navigate("/user/register")}
              className="bg-blue-500 px-4 py-2 rounded-lg w-40 hover:bg-blue-600 flex justify-center items-center gap-2"
            >
              Sign Up <PiUserCirclePlusBold className="text-white w-5 h-5" />
            </button>
          </div>
        )}
      </ul>
      </div>
    )}
    </>
  );
};

export default AdminMobile;
