import React from "react";
import { NavLink } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiShieldUserLine } from "react-icons/ri";
import { PiUserCirclePlusBold } from "react-icons/pi";
import { TbListDetails } from "react-icons/tb";
import { FaTimes , FaCalendarCheck , FaPowerOff , FaHotel } from "react-icons/fa";
import { IoHeartCircleOutline } from "react-icons/io5";

const UserMobile = ({ user, navigate, isMenuOpen, toggleMenu }) => {
  return (
    <div
      className={`absolute top-0 right-0 w-full  z-50 transform bg-gradient-to-r from-zinc-600 to-slate-800 text-white p-6 shadow-lg ${
        isMenuOpen ? "translate-x-0 sm:translate-y-0" : "translate-x-full hidden"
      } transition-transform duration-300`}
     >
      <button className="absolute top-4 right-7 sm:right-10 text-white hover:text-red-500 sm:py-3"  onClick={toggleMenu}>
        <FaTimes size={28} />
      </button>
      <ul className=" mt-8 space-y-8 p-4 text-sm font-semibold sm:text-xl flex flex-col items-center justify-center">
        {user?.role === "admin" && (
          <li className="opacity-80 flex items-center justify-center p-2.5 gap-3 bg-gray-800 rounded-2xl w-60 hover:text-yellow-400">
            <MdAdminPanelSettings className="text-xl" />
            <NavLink to="/admin" onClick={toggleMenu}>
              Admin Panel
            </NavLink>
          </li>
        )}
        <li className="opacity-80 flex items-center justify-center p-2.5 gap-3 bg-gray-800 rounded-2xl w-60 hover:text-yellow-400">
          <FaHotel  className="text-xl" />
          <NavLink to={`/`}>All Hotels</NavLink>
        </li>
        <li className="opacity-80 flex items-center justify-center p-2.5 gap-3 bg-gray-800 rounded-2xl w-60 hover:text-yellow-400">
          <TbListDetails className="text-xl" />
          <NavLink to={`/user/${user?._id}/account`}>My Account</NavLink>
        </li>
        <li className="opacity-80 flex items-center justify-center p-2.5 gap-3 bg-gray-800 rounded-2xl w-60 hover:text-yellow-400">
          <IoHeartCircleOutline className="text-xl" />
          <NavLink to={`/user/${user?._id}/wishlists`}>My Wishlists</NavLink>
        </li>
        <li className="opacity-80 flex items-center justify-center p-2.5 gap-3 bg-gray-800 rounded-2xl w-60 hover:text-yellow-400">
          <FaCalendarCheck  className="text-xl" />
          <NavLink to={`/user/${user?._id}/bookings`}>My Bookings</NavLink>
        </li>
         {user ? (
                <button onClick={() => navigate("/user/logout")} className="bg-red-500 px-4 py-2 rounded-full w-48 hover:bg-red-600 flex justify-center items-center gap-2">
                  <span className="flex gap-2">
                    Logout <FaPowerOff className="text-white w-5 h-5" />
                  </span>
                </button>
              ) : (
                <>
                  <button onClick={() => navigate("/user/login")} className="bg-transparent px-3 py-3 rounded-lg hover:bg-green-600 hover:bg-opacity-60">
                    <span className="flex gap-2">
                      Login <RiShieldUserLine className="text-white w-5 h-5 mt-1" />
                    </span>
                  </button>
                  <button onClick={() => navigate("/user/register")} className="bg-transparent px-3 py-3 rounded-lg hover:bg-blue-500 hover:bg-opacity-60">
                    <span className="flex gap-2">
                      Sign up <PiUserCirclePlusBold className="text-white w-5 h-5 mt-1" />
                    </span>
                  </button>
                </>
              )}
      </ul>
    </div>
  );
};

export default UserMobile;
