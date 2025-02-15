import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../../userContext/userContext';
import WebsiteLogo from '../../../assets/main-logo.png';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // Optional for default styling
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';
import NavImg from './NavImg';
import NavHeader from './NavHeader';
const Navbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
 useEffect(() => {
    AOS.init({
      duration: 1500, // Animation duration
      easing: "ease-in-out", // Smooth effect
      mirror:true,
      once: false, // Animation repeats on scroll
    });
  }, []);
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/v1/user/logout', { withCredentials: true });
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  const navLinkStyling = `sm:hover:scale-105 sm:hover:text-yellow-500 sm:hover:font-semibold transition-all duration-100`
  return (
    <nav className="  text-white  ">
      <div className="container flex justify-center items-center px-6 sm:justify-between  lg:px-8">
        {/* Logo and Welcome Message */}
        <div className="flex  items-center space-x-5">
        <NavImg/>

         <NavHeader/>
        </div>

        <DesktopNavbar/>
       <MobileNavbar/>
       </div>
    </nav>
  );
};

export default Navbar;
