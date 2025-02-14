import React , {useEffect} from 'react'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useUser } from '../../userContext/userContext';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // Optional for default styling
import { MdOutlineLogout } from "react-icons/md";
import { RiShieldUserLine  } from "react-icons/ri";
import { PiUserCirclePlusBold } from "react-icons/pi";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
const DesktopNavbar = () => {
      const { user, setUser } = useUser();
      const navigate = useNavigate();
       useEffect(() => {
          AOS.init({
            duration: 1500, // Animation duration
            easing: "ease-in-out", // Smooth effect
            mirror:true,
            once: false, // Animation repeats on scroll
          });
        }, []);
          const navLinkStyling = `sm:hover:scale-105 sm:hover:text-yellow-500 sm:hover:font-semibold transition-all duration-100`
           const handleLogout = async () => {
              try {
                await axios.post('http://localhost:8000/v1/user/logout', { withCredentials: true });
                setUser(null);
                navigate('/');
              } catch (error) {
                console.error('Logout failed:', error);
              }
            };
  return (
    <>
        {/* Desktop Menu */}
        <ul className="hidden capitalize lg:flex absolute right-7 gap-9  items-center  " data-aos="fade-up">
        <li className={` ${navLinkStyling} ${user ? (user.role === "admin" ? "admin" : "hidden") : ""} `}>
        <Tippy content="Admin Panel" >
          <NavLink to="/admin/dashboard">
           Admin
          </NavLink>
        </Tippy>
      </li>
          <li className={`${navLinkStyling}`}>
          <Tippy content="Home">
            <NavLink to="/">
              Home
            </NavLink>
            </Tippy>
          </li>
          <li className={`${navLinkStyling}`}>
          <Tippy content="Contact Us">
            <NavLink to="/contact">
             Connect
            </NavLink>
            </Tippy>
          </li>
          <li className={`${navLinkStyling}`}>
          <Tippy content="About Us" >
            <NavLink to="/about">
              about us
            </NavLink>
            </Tippy>
          </li>
          <li className={`${navLinkStyling}`}>
          <Tippy content="Our Blogs" >
            <NavLink to="/all-blogs">
              blogs
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
            className="bg-transparent px-4 py-3 rounded-lg hover:shadow-md hover:shadow-gray-800  hover:bg-red-600 hover:bg-opacity-60 text-sm "
            >
            <span className='flex gap-2'>
            Logout <MdOutlineLogout className="text-white w-5 h-5"/>
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

    </>
  )
}

export default DesktopNavbar
