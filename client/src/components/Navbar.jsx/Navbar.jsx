import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoHomeSharp, IoBusiness } from 'react-icons/io5';
import { FaMapMarkerAlt, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import { useUser } from '../userContext/userContext';
import WebsiteLogo from '../../assets/main-logo.png';

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
    <nav className="bg-[#15455f] text-white shadow-md ">
      <div className="container flex justify-center items-center px-6 sm:justify-between  lg:px-8">
        {/* Logo and Welcome Message */}
        <div className="flex  items-center space-x-5">
          <NavLink to="/">
            <img
              src={WebsiteLogo}
              alt="UrbanHaven"
              className="w-16 sm:w-20 lg:w-24"
              title='urbanhaven'
            />
          </NavLink>
          <h1 className="hidden sm:text-lg sm:block  text-white font-semibold truncate">
            {user ? `Welcome, ${user.name} to UrbanHaven !` : 'Welcome to UrbanHaven !'}
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden  lg:flex absolute right-7 gap-10  items-center ">
          <li >
            <NavLink to="/admin">
              <MdAdminPanelSettings className="text-2xl text-white" title='admin panel' />
            </NavLink>
          </li>
          <li >
            <NavLink to="/">
              <IoHomeSharp className="text-2xl text-white" title='home' />
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact">
              <FaMapMarkerAlt className="text-2xl text-white" title='contact us' />
            </NavLink>
          </li>
          <li>
            <NavLink to="/api/v1/about">
              <IoBusiness className="text-2xl text-white" title='about us' />
            </NavLink>
          </li>
          <li>
            <NavLink to={user ? `/user/${user._id}/account` : '/user/login'} title='my account'>
              {user ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              ) : (
                <FaUserCircle className="text-2xl text-white" />
              )}
            </NavLink>
          </li>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate('/user/login')}
                className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/user/register')}
                className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Sign Up
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
    <li className="flex items-center justify-center space-x-2 py-2">
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
            className="w-8 h-8 rounded-full border-2 border-white"
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
          className="bg-red-500 px-4 py-2 mt-2 rounded-lg w-full flex items-center justify-center space-x-2"
        >
          <FaTimes className="text-xl" />
          <span>Logout</span>
        </button>
      ) : (
        <>
          <button
            onClick={() => navigate('/user/login')}
            className="bg-green-500 px-4 py-2 mt-2 rounded-lg w-full flex items-center justify-center space-x-2"
          >
            <FaUserCircle className="text-xl" />
            <span>Login</span>
          </button>
          <button
            onClick={() => navigate('/user/register')}
            className="bg-blue-500 px-4 py-2 rounded-lg w-full mt-2 flex items-center justify-center space-x-2"
          >
            <FaUserCircle className="text-xl" />
            <span>Sign Up</span>
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
