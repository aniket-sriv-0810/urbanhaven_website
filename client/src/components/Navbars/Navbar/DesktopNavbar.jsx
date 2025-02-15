import React from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { RiShieldUserLine } from "react-icons/ri";
import { PiUserCirclePlusBold } from "react-icons/pi";
import { useUser } from "../../userContext/userContext";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";


const DesktopNavbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();


  const navItems = [
    { to: "/", label: "Home", tooltip: "Home" },
    { to: "/contact", label: "Connect", tooltip: "Contact Us" },
    { to: "/about", label: "About Us", tooltip: "About Us" },
    { to: "/all-blogs", label: "Blogs", tooltip: "Our Blogs" },
  ];

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/v1/user/logout", { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <ul className="hidden capitalize lg:flex absolute right-7 gap-9 items-center" data-aos="fade-up">
      {user?.role === "admin" && (
        <li>
          <Tippy content="Admin Panel">
            <NavLink to="/admin/dashboard" className="hover:text-yellow-500  hover:font-semibold">
              Admin
            </NavLink>
          </Tippy>
        </li>
      )}

      {navItems.map(({ to, label, tooltip }) => (
        <li key={to} className="hover:scale-110 hover:font-semibold">
          <Tippy content={tooltip}>
            <NavLink to={to} className="hover:text-yellow-500  ">
              {label}
            </NavLink>
          </Tippy>
        </li>
      ))}

      <li>
        <Tippy content="View Profile">
          <NavLink to={user ? `/user/${user._id}/account` : "/user/login"}>
            {user ? (
              <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full hover:scale-110" />
            ) : (
              <FaUserCircle className="text-2xl text-white" />
            )}
          </NavLink>
        </Tippy>
      </li>

      {user ? (
        <button
          onClick={handleLogout}
          className="bg-transparent px-4 py-3 rounded-lg hover:shadow-md hover:bg-red-600 hover:bg-opacity-60 flex items-center gap-2"
        >
          Logout <MdOutlineLogout className="text-white w-5 h-5" />
        </button>
      ) : (
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/user/login")}
            className="bg-transparent px-3 py-3 rounded-lg hover:shadow-md hover:bg-green-600 hover:bg-opacity-60 flex items-center gap-2"
          >
            Login <RiShieldUserLine className="text-white w-5 h-5" />
          </button>
          <button
            onClick={() => navigate("/user/register")}
            className="bg-transparent px-3 py-3 rounded-lg hover:shadow-md hover:bg-blue-500 hover:bg-opacity-60 flex items-center gap-2"
          >
            Sign Up <PiUserCirclePlusBold className="text-white w-5 h-5" />
          </button>
        </div>
      )}
    </ul>
  );
};

export default DesktopNavbar;
