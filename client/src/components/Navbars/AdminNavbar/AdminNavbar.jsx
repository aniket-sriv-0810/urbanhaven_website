import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoHomeSharp, IoBusiness } from 'react-icons/io5';
import { FaMapMarkerAlt, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { FaPaperPlane } from "react-icons/fa";
import { FaBuildingWheat } from "react-icons/fa6";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { MdAdminPanelSettings } from 'react-icons/md';
import { useUser } from '../../userContext/userContext';
import WebsiteLogo from '../../../assets/main-logo.png';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // Optional for default styling
import { MdOutlineLogout } from "react-icons/md";
import { RiShieldUserLine } from "react-icons/ri";
import { PiUserCirclePlusBold } from "react-icons/pi";
const AdminNavbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/v1/user/logout', {}, { withCredentials: true });
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className=" bg-gradient-to-r from-slate-500 to-slate-800 text-white  ">
      <div className="container flex justify-center items-center px-6 sm:justify-between  lg:px-8">
        {/* Logo and Welcome Message */}
        <div className="flex  items-center space-x-5">
        <Tippy content="Urbanhaven" className='bg-red-400'>
          <NavLink to="/">
            <img
              src={WebsiteLogo}
              alt="UrbanHaven"
              className="w-16 sm:w-20 lg:w-24"
            />
          </NavLink>
          </Tippy>
          <h1 className="hidden sm:text-lg sm:block lg:hidden xl:block text-white font-semibold truncate">
            {user ? `Welcome Admin,  ${user.name} to UrbanHaven !` : 'Welcome to UrbanHaven !'}
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden capitalize lg:flex absolute right-7 gap-6  items-center  ">
        <li className={` ${user ? (user.role === "admin" ? "admin" : "hidden") : ""} hover:text-yellow-400 hover:scale-110 transition-all duration-100 `}>
        <Tippy content="Admin Panel">
          <NavLink to="/admin">
           Admin
          </NavLink>
        </Tippy>
      </li>
          <li >
          <Tippy content="Home">
            <NavLink to="users">
              Users
            </NavLink>
            </Tippy>
          </li>
          <li>
          <Tippy content="Contact Us">
            <NavLink to="hotels">
             Hotels
            </NavLink>
            </Tippy>
          </li>
          <li>
          <Tippy content="About Us" >
            <NavLink to="bookings">
              Bookings
            </NavLink>
            </Tippy>
          </li>
          <li>
          <Tippy content="About Us" >
            <NavLink to="contacts">
              Feedbacks
            </NavLink>
            </Tippy>
          </li>
          <button
            onClick={() => { navigate("new-hotel")}}
            className="-mr-4 bg-transparent px-4 py-3 rounded-lg hover:shadow-md hover:shadow-gray-800  hover:bg-purple-600 hover:bg-opacity-60 text-sm "
            >
            <span className='flex gap-2'>
            Add Hotels<MdOutlineLogout className="text-white w-5 h-5"/>
            </span>
            </button>
          <button
            onClick={() => { navigate ('/blogs/add')}}
            className="bg-transparent px-4 py-3 rounded-lg hover:shadow-md hover:shadow-gray-800  hover:bg-orange-600 hover:bg-opacity-60 text-sm "
            >
            <span className='flex gap-2'>
            Add Blogs <MdOutlineLogout className="text-white w-5 h-5"/>
            </span>
            </button>
          
          {user ? (
            
            <button
            onClick={handleLogout}
            className="bg-transparent px-4 py-3 rounded-lg hover:shadow-md hover:shadow-gray-800  hover:bg-red-600 hover:bg-opacity-60 text-sm "
            >
            <span className='flex gap-2'>
            log out <MdOutlineLogout className="text-white w-5 h-5"/>
            </span>
            </button>
            
          ) : (
            <>
              <button
                onClick={() => navigate('/user/login')}
                className="bg-transparent px-3 py-3 rounded-lg hover:shadow-md hover:shadow-gray-800 hover:bg-green-600 hover:bg-opacity-60"
                >
                <span className='flex gap-2'>
                Login  <RiShieldUserLine className="text-white w-5 h-5 mt-1"/>
                </span>
                </button>
                <button
                onClick={() => navigate('/user/register')}
                className="bg-transparent px-3 py-3 rounded-lg hover:shadow-md hover:shadow-gray-800 hover:bg-blue-500 hover:bg-opacity-60"
                >
                <span className='flex gap-2'>
                Sign up <PiUserCirclePlusBold className="text-white w-5 h-5 mt-1"/>
                </span>
                </button>
            </>
          )}
        </ul>

        {/* Hamburger Icon */}
        <button className="absolute right-3 sm:right-8 lg:hidden text-white focus:outline-none mr-2" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

    {/* Mobile Menu */}
    <div
    className={`absolute top-0 right-0 w-full h-max text-white z-50 transform bg-gradient-to-r from-slate-900 to-slate-700 p-6 rounded-lg shadow-lg   ${
      isMenuOpen ? "translate-x-0 sm:translate-y-0" : "translate-x-full hidden "
    } transition-transform duration-300`}
  >
    <button
      className="absolute top-4 right-7 sm:right-10  text-white sm:py-3"
      onClick={toggleMenu}
    >
      <FaTimes size={24} />
    </button>
    <ul className="mt-8 space-y-10 p-4 text-sm  sm:text-xl flex flex-col items-center justify-center ">
      {user?.role === "admin" && (
        <li className="flex items-center gap-2">
          <MdAdminPanelSettings className="text-xl" />
          <NavLink to="/admin" onClick={toggleMenu}>
            Admin
          </NavLink>
        </li>
      )}
      <li className="flex items-center gap-2">
        <IoHomeSharp className="text-xl" />
        <NavLink to="users" onClick={toggleMenu}>
          Users
        </NavLink>
      </li>
      <li className="flex items-center gap-2">
        <FaPaperPlane className="text-xl" />
        <NavLink to="hotels" onClick={toggleMenu}>
          Hotels
        </NavLink>
      </li>
      <li className="flex items-center gap-2">
        <RiQuestionAnswerFill className="text-xl" />
        <NavLink to="bookings" onClick={toggleMenu}>
          Bookings
        </NavLink>
      </li>
      <li className="flex items-center gap-2">
        <RiQuestionAnswerFill className="text-xl" />
        <NavLink to="contacts" onClick={toggleMenu}>
          Feedbacks
        </NavLink>
      </li>
      <li className="flex items-center gap-2">
        <RiQuestionAnswerFill className="text-xl" />
        <NavLink to="contacts" onClick={toggleMenu}>
          Add Hotels
        </NavLink>
      </li>
      <li className="flex items-center gap-2">
        <RiQuestionAnswerFill className="text-xl" />
        <NavLink to="contacts" onClick={toggleMenu}>
          Add Blogs
        </NavLink>
      </li>
      <li className="flex items-center gap-2">
        {user ? (
          <img
            src={user.image}
            alt={user.name}
            className="w-8 h-8 rounded-full border-2 border-white"
          />
        ) : (
          <FaUserCircle className="text-xl" />
        )}
        <NavLink
          to={user ? `/user/${user._id}/account` : "/user/login"}
          onClick={toggleMenu}
        >
          My Profile
        </NavLink>
      </li>
      {user ? (
        <button
          onClick={handleLogout}
          className="bg-red-500  px-4 py-2 rounded-lg w-48 hover:bg-red-600 flex justify-center items-center gap-2 sm:w-60"
        >
          Logout <MdOutlineLogout className="text-white w-5 h-5" />
        </button>
      ) : (
        <>
        <div className='flex flex-col space-y-6'>
          <button
            onClick={() => navigate("/user/login")}
            className="bg-green-500 px-4 py-2 rounded-lg w-40 hover:bg-green-600 flex justify-center items-center gap-2 sm:w-60"
          >
            Login <RiShieldUserLine className="text-white w-5 h-5" />
          </button>
          <button
            onClick={() => navigate("/user/register")}
            className="bg-blue-500 px-4 py-2 rounded-lg w-40 hover:bg-blue-600 flex justify-center items-center gap-2  sm:w-60"
          >
            Sign Up <PiUserCirclePlusBold className="text-white w-5 h-5" />
          </button>
          </div>
        </>
      )}
    </ul>
  </div>

    </nav>
  );
};

export default AdminNavbar;
