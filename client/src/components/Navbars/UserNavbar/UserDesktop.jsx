import React from "react";
import { NavLink } from "react-router-dom";
import Tippy from "@tippyjs/react";
import { MdOutlineLogout } from "react-icons/md";
import { RiShieldUserLine } from "react-icons/ri";
import { PiUserCirclePlusBold } from "react-icons/pi";

const UserDesktop = ({ user, navigate }) => {
  return (
    <ul className="hidden capitalize lg:flex absolute right-7 gap-9 items-center" data-aos="fade-up">
      {user?.role === "admin" && (
        <li className="hover:text-yellow-400 hover:scale-110 transition-all duration-100 hover:font-semibold">
          <Tippy content="Admin Panel">
            <NavLink to="/admin">Admin</NavLink>
          </Tippy>
        </li>
      )}
      <li className="hover:text-yellow-400 hover:scale-110 transition-all duration-100 hover:font-semibold">
        <Tippy content="My Account">
          <NavLink to={`/user/${user?._id}/account`}>My Account</NavLink>
        </Tippy>
      </li>
      <li className="hover:text-yellow-400 hover:scale-110 transition-all duration-100 hover:font-semibold">
        <Tippy content="My Wishlists">
          <NavLink to={`/user/${user?._id}/wishlists`}>My Wishlists</NavLink>
        </Tippy>
      </li>
      <li className="hover:text-yellow-400 hover:scale-110 transition-all duration-100 hover:font-semibold">
        <Tippy content="My Bookings">
          <NavLink to={`/user/${user?._id}/bookings`}>My Bookings</NavLink>
        </Tippy>
      </li>
      {user ? (
        <button onClick={() => navigate("/user/logout")} className="flex items-center justify-center bg-transparent px-4 py-3 rounded-lg hover:bg-red-600 hover:bg-opacity-80">
          <span className="flex gap-2">
            Log out <MdOutlineLogout className="text-white w-5 h-5 mt-0.5 " />
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
  );
};

export default UserDesktop;
