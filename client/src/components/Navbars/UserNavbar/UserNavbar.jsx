import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useUser } from "../../userContext/userContext";
import UserNavLogo from "./UserNavLogo";
import UserNavHeading from "./UserNavHeading";
import UserDesktop from "./UserDesktop";
import UserMobile from "./UserMobile";

const UserNavbar = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);


  return (
    <nav className="bg-gradient-to-r from-slate-600 to-slate-800 text-white">
      <div className="flex justify-center items-center px-6 sm:justify-between lg:px-8">
        <div className="flex items-center xs:-ml-5 space-x-5" data-aos="fade-down">
          <UserNavLogo />
          <UserNavHeading user={user} />
        </div>

        <UserDesktop user={user} navigate={navigate} />
 
        {/* Hamburger Icon */}
        <button className="absolute right-3 sm:right-8 lg:hidden text-white focus:outline-none mr-2" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      <UserMobile user={user}  navigate={navigate} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </nav>
  );
};

export default UserNavbar;
