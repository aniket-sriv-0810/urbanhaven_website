import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // Optional for default styling
import { MdOutlineLogout } from "react-icons/md";
import { useUser } from "../../userContext/userContext";

const AdminDesktop = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const navItems = [
    { to: "users", label: "Users", tooltip: "User Details" },
    { to: "hotels", label: "Hotels", tooltip: "Hotel Details" },
    { to: "bookings", label: "Bookings", tooltip: "Booking Details" },
    { to: "contacts", label: "Feedbacks", tooltip: "Feedback Details" },
  ];

  return (
    <>
      {/* Desktop Menu */}
      <ul className="hidden capitalize lg:flex gap-6 items-center">
        {/* Admin Panel Link */}
        {user?.role === "admin" && (
          <li className="hover:scale-110 hover:font-semibold hover:text-yellow-500 transition-all duration-100">
            <Tippy content="Admin Panel">
              <NavLink to="/admin">Admin</NavLink>
            </Tippy>
          </li>
        )}

        {/* Navigation Links */}
        {navItems.map(({ to, label, tooltip }) => (
          <li key={to} className="hover:scale-110 hover:font-semibold">
            <Tippy content={tooltip}>
              <NavLink to={to} className="hover:text-yellow-500">{label}</NavLink>
            </Tippy>
          </li>
        ))}

        {/* Button Group */}

          <button
            onClick={() => navigate("new-hotel")}
            className=" bg-purple-600 bg-opacity-60 p-2.5 text-sm rounded-lg hover:shadow-md hover:bg-opacity-80 text-white flex justify-end items-center gap-2"
          >
            Add Hotels <MdOutlineLogout className="w-5 h-5" />
          </button>

          <button
            onClick={() => navigate("new-blog")}
            className="bg-orange-600 bg-opacity-60 p-2.5 rounded-lg text-sm hover:shadow-md hover:bg-opacity-80 text-white flex items-center gap-2"
          >
            Add Blogs <MdOutlineLogout className="w-5 h-5" />
          </button>

          <button
            onClick={() => navigate('/user/logout')}
            className="bg-red-600 bg-opacity-60 p-2.5 rounded-lg text-sm hover:shadow-md hover:bg-opacity-80 text-white flex items-center gap-2"
          >
            Log Out <MdOutlineLogout className="w-5 h-5" />
          </button>
        
      </ul>
    </>
  );
};

export default AdminDesktop;
