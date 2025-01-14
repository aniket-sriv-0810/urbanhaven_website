import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoHomeSharp, IoBusiness } from 'react-icons/io5';
import { FaMapMarkerAlt, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import { useUser } from '../userContext/userContext';
import WebsiteLogo from '../../assets/main-logo.png';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // Optional for default styling
import { MdOutlineLogout } from "react-icons/md";
import { RiShieldUserLine } from "react-icons/ri";
import { PiUserCirclePlusBold } from "react-icons/pi";
const Navbar = () => {
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
    <nav className="bg-[#2d2e30] text-white shadow-md ">
      <div className="container flex justify-center items-center px-6 sm:justify-between  lg:px-8">
        {/* Logo and Welcome Message */}
        <div className="flex  items-center space-x-5">
        <Tippy content="Admin Panel" className='bg-red-400'>
          <NavLink to="/">
            <img
              src={WebsiteLogo}
              alt="UrbanHaven"
              className="w-16 sm:w-20 lg:w-24"
            />
          </NavLink>
          </Tippy>
          <h1 className="hidden sm:text-lg sm:block  text-white font-semibold truncate">
            {user ? `Welcome, ${user.name} to UrbanHaven !` : 'Welcome to UrbanHaven !'}
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden  lg:flex absolute right-7 gap-10  items-center ">
        <li className={`${user ? (user.role === "admin" ? "admin" : "hidden") : ""}`}>
        <Tippy content="Admin Panel" >
          <NavLink to="/admin">
            <MdAdminPanelSettings className="text-2xl text-white" />
          </NavLink>
        </Tippy>
      </li>
          <li >
          <Tippy content="Home">
            <NavLink to="/">
              <IoHomeSharp className="text-2xl text-white" />
            </NavLink>
            </Tippy>
          </li>
          <li>
          <Tippy content="Contact Us">
            <NavLink to="/contact">
              <FaMapMarkerAlt className="text-2xl text-white" title='contact us' />
            </NavLink>
            </Tippy>
          </li>
          <li>
          <Tippy content="About Us" >
            <NavLink to="/api/v1/about">
              <IoBusiness className="text-2xl text-white" title='about us' />
            </NavLink>
            </Tippy>
          </li>
          <li>
          <Tippy content="Viw Profile">
            <NavLink to={user ? `/user/${user._id}/account` : '/user/login'} >
              {user ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border-2 border-black"
                />
              ) : (
                <FaUserCircle className="text-2xl text-white" />
              )}
            </NavLink>
            </Tippy>
          </li>
          {user ? (
            
            <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-3 rounded-lg hover:bg-red-600 text-sm "
            >
            <span className='flex gap-2'>
            Logout <MdOutlineLogout className="text-white w-5 h-5"/>
            </span>
            </button>
            
          ) : (
            <>
              <button
                onClick={() => navigate('/user/login')}
                className="bg-green-500 px-4 py-3 rounded-lg hover:bg-green-600"
                >
                <span className='flex gap-2'>
                Login  <RiShieldUserLine className="text-white w-5 h-5 mt-1"/>
                </span>
                </button>
                <button
                onClick={() => navigate('/user/register')}
                className="bg-blue-500 px-4 py-3 rounded-lg hover:bg-blue-600"
                >
                <span className='flex gap-2'>
                Sign up <PiUserCirclePlusBold className="text-white w-5 h-5 mt-1"/>
                </span>
                </button>
                
            </>
          )}
        </ul>

        {/* Hamburger Icon */}
        <button className="absolute right-3 lg:hidden text-white focus:outline-none mr-2" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

    {/* Mobile Menu */}
{isMenuOpen && (
  <ul className="lg:hidden bg-[#414141] text-white space-y-4 p-4 ">
  <li className={`flex items-center justify-center space-x-2 py-2 ${ user ? user.role =="admin" ? "admin" :"hidden" : null }`}>
  <MdAdminPanelSettings className="text-xl" />
  <NavLink to="/admin" onClick={toggleMenu} className="hover:underline">
    Admin Panel
  </NavLink>
</li>

    <li className="flex items-center justify-center space-x-2 py-2">
      <IoHomeSharp className="text-xl" />
      <NavLink to="/" onClick={toggleMenu} className="hover:underline">
        Home Page
      </NavLink>
    </li>
    <li className="flex items-center justify-center space-x-2 py-2">
      <FaMapMarkerAlt className="text-xl" />
      <NavLink to="/contact" onClick={toggleMenu} className="hover:underline">
        Contact Us
      </NavLink>
    </li>
    <li className="flex items-center justify-center space-x-2 py-2">
      <IoBusiness className="text-xl" />
      <NavLink to="/api/v1/about" onClick={toggleMenu} className="hover:underline">
        About Us
      </NavLink>
    </li>
    <li className="flex items-center justify-center space-x-2 py-2">
      {user ? (
        <>
          <img
            src={user.image}
            alt={user.name}
            className="w-8 h-8 rounded-full border-2 border-black"
          />
          <NavLink to={`/user/${user._id}/account`} onClick={toggleMenu} className="hover:underline">
            My Profile
          </NavLink>
        </>
      ) : (
        <>
          <FaUserCircle className="text-xl" />
          <NavLink to="/user/login" onClick={toggleMenu} className="hover:underline">
            My Profile
          </NavLink>
        </>
      )}
    </li>
    <li>
      {user ? (
        <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-3 m-auto rounded-lg  w-60 flex items-center justify-center space-x-2 hover:bg-red-600 text-sm "
        >
        <span className='flex gap-2'>
        Logout <MdOutlineLogout className="text-white w-5 h-5"/>
        </span>
        </button>
      ) : (
        <>
       
        <button
        onClick={() => navigate('/user/login')}
        className="bg-green-500 px-4 py-3 m-auto rounded-lg  w-60 flex items-center justify-center space-x-2 hover:bg-green-600  "
        >
        <span className='flex gap-2'>
                Login  <RiShieldUserLine className="text-white w-5 h-5 mt-1"/>
                </span>
        </button>
        <button
        onClick={() => navigate('/user/register')}
        className="bg-blue-500 px-4 py-3 m-auto rounded-lg  w-60 flex items-center justify-center space-x-2 hover:bg-blue-600 mt-5 "
        >
        <span className='flex gap-2'>
                Sign up  <PiUserCirclePlusBold className="text-white w-5 h-5 mt-1 "/>
                </span>
        </button>
        </>
      )}
    </li>
  </ul>
)}

    </nav>
  );
};

export default Navbar;
