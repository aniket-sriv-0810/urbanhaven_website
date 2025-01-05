import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoHomeSharp, IoBusiness } from 'react-icons/io5';
import { FaMapMarkerAlt, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import { useUser } from '../userContext/userContext';
import WebsiteLogo from '../../assets/webiste_full_logo.png';

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
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo and Welcome Message */}
        <div className="flex items-center space-x-4">
          <NavLink to="/">
            <img src={WebsiteLogo} alt="UrbanHaven" className="w-28" />
          </NavLink>
          <h1 className="text-black text-lg md:text-xl font-semibold">
            {user ? `Welcome, ${user.name} to UrbanHaven!` : 'Welcome to UrbanHaven!'}
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 items-center text-lg">
          <li>
            <NavLink to="/admin">
              <MdAdminPanelSettings className="text-2xl text-black" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <IoHomeSharp className="text-2xl text-black" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact">
              <FaMapMarkerAlt className="text-2xl text-black" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/api/v1/about">
              <IoBusiness className="text-2xl text-black" />
            </NavLink>
          </li>
          <li>
            <NavLink to={user ? `/user/${user._id}/account` : '/user/login'}>
              {user ? (
                <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full" />
              ) : (
                <FaUserCircle className="text-2xl text-black" />
              )}
            </NavLink>
          </li>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate('/user/login')}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 ml-4"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/user/register')}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 ml-4"
              >
                Sign Up
              </button>
            </>
          )}
        </ul>

        {/* Hamburger Icon */}
        <button className="md:hidden text-white focus:outline-none" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden bg-blue-700 text-white space-y-4 p-4 text-center">
          <li>
            <NavLink to="/admin" onClick={toggleMenu}>
              <MdAdminPanelSettings className="text-2xl" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/" onClick={toggleMenu}>
              <IoHomeSharp className="text-2xl" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={toggleMenu}>
              <FaMapMarkerAlt className="text-2xl" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/api/v1/about" onClick={toggleMenu}>
              <IoBusiness className="text-2xl" />
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink to={`/user/${user._id}/account`} onClick={toggleMenu}>
                <img src={user.image} alt={user.name} className="w-10 h-10 mx-auto rounded-full" />
              </NavLink>
            </li>
          )}
          <li>
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg w-full"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/user/login')}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg w-full"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/user/register')}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mt-2"
                >
                  Sign Up
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
