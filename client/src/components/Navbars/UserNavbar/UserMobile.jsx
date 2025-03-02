import React from "react";
import { NavLink } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiShieldUserLine } from "react-icons/ri";
import { PiUserCirclePlusBold } from "react-icons/pi";
import { MdOutlineLogout } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { FaPowerOff } from "react-icons/fa";

const UserMobile = ({ user, navigate, isMenuOpen, toggleMenu }) => {
  return (
    <div
      className={`absolute top-0 right-0 w-full text-white z-50 transform bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-lg shadow-lg ${
        isMenuOpen ? "translate-x-0 sm:translate-y-0" : "translate-x-full hidden"
      } transition-transform duration-300`}
    >
      <button className="absolute top-4 right-7 sm:right-10 text-white sm:py-3" onClick={toggleMenu}>
        <FaPowerOff size={24} />
      </button>
      <ul className="mt-8 space-y-10 p-4 text-sm font-semibold sm:text-xl flex flex-col items-center justify-center">
        {user?.role === "admin" && (
          <li className="flex items-center gap-2">
            <MdAdminPanelSettings className="text-xl" />
            <NavLink to="/admin" onClick={toggleMenu}>
              Admin Panel
            </NavLink>
          </li>
        )}
        <li className="flex items-center gap-2">
          <TbListDetails className="text-xl" />
          <NavLink to={`/user/${user?._id}/account`}>My Account</NavLink>
        </li>
         {user ? (
                <button onClick={() => navigate("/user/logout")} className="bg-transparent px-4 py-3 rounded-lg hover:bg-red-600 hover:bg-opacity-60">
                  <span className="flex gap-2">
                    Log out <MdOutlineLogout className="text-white w-5 h-5" />
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
