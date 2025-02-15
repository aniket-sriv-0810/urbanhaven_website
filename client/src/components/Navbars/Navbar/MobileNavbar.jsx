import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { FaUserCircle, FaBars, FaTimes, FaPaperPlane } from "react-icons/fa";
import { RiQuestionAnswerFill, RiShieldUserLine, RiArticleFill } from "react-icons/ri";
import { MdAdminPanelSettings, MdOutlineLogout } from "react-icons/md";
import { PiUserCirclePlusBold } from "react-icons/pi";
import { useUser } from "../../userContext/userContext";
import "tippy.js/dist/tippy.css";

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/v1/user/logout", { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const menuItems = [
    { to: "/", label: "All hotels", icon: <IoHomeSharp /> },
    { to: "/contact", label: "Contact us", icon: <FaPaperPlane /> },
    { to: "/about", label: "About us", icon: <RiQuestionAnswerFill /> },
    { to: "/all-blogs", label: "Our Blogs", icon: <RiArticleFill /> },
  ];

  return (
    <>
      {/* Hamburger Icon */}
      <button
        className="absolute right-3 sm:right-8 lg:hidden text-white focus:outline-none mr-2"
        onClick={toggleMenu}
        data-aos="fade-left"
      >
        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-0 right-0 w-full h-max text-white z-50 bg-gradient-to-r from-slate-900 to-slate-700 p-6 shadow-lg transition-all duration-300">
          <button className="absolute top-4 right-7 sm:right-10 text-white sm:py-3" onClick={toggleMenu}>
            <FaTimes size={24} />
          </button>

          <ul className="mt-8 space-y-10 p-4 text-sm sm:text-xl flex flex-col items-center justify-center">
            {user?.role === "admin" && (
              <li className="flex items-center gap-2">
                <MdAdminPanelSettings className="text-xl" />
                <NavLink to="/admin" onClick={toggleMenu}>
                  Admin Panel
                </NavLink>
              </li>
            )}

            {menuItems.map(({ to, label, icon }) => (
              <li key={to} className="flex items-center gap-2">
                {icon}
                <NavLink to={to} onClick={toggleMenu}>
                  {label}
                </NavLink>
              </li>
            ))}

            <li className="flex items-center gap-2">
              {user ? (
                <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full border-2 border-white" />
              ) : (
                <FaUserCircle className="text-xl" />
              )}
              <NavLink to={user ? `/user/${user._id}/account` : "/user/login"} onClick={toggleMenu}>
                My Profile
              </NavLink>
            </li>

            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg w-48 hover:bg-red-600 flex justify-center items-center gap-2 sm:w-60"
              >
                Logout <MdOutlineLogout className="text-white w-5 h-5" />
              </button>
            ) : (
              <div className="flex flex-col space-y-6">
                <button
                  onClick={() => navigate("/user/login")}
                  className="bg-green-500 px-4 py-2 rounded-lg w-40 hover:bg-green-600 flex justify-center items-center gap-2 sm:w-60"
                >
                  Login <RiShieldUserLine className="text-white w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate("/user/register")}
                  className="bg-blue-500 px-4 py-2 rounded-lg w-40 hover:bg-blue-600 flex justify-center items-center gap-2 sm:w-60"
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

export default MobileNavbar;
