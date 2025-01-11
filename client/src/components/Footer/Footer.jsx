import React from "react";
import Logo from '../../assets/main-logo.png';
import { NavLink } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa6";
import { CgMail } from "react-icons/cg";
import { GrInstagram } from "react-icons/gr";
import { FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#222324] text-gray-300 py-9">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <img src={Logo} alt="Logo" className="w-20 md:w-24" />
          </div>

          {/* Navigation Links */}
          <ul className=" flex flex-wrap justify-center  items-center space-x-4 text-sm md:space-x-8 lg:relative lg:left-10">
            <li>
              <NavLink to="/" className="hover:text-blue-400 transition duration-300">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-blue-400 transition duration-300">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:text-blue-400 transition duration-300">
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/policies" className="hover:text-blue-400 transition duration-300">
                Policies
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="hover:text-blue-400 transition duration-300">
                Show
              </NavLink>
            </li>
          </ul>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-7 w-max">
            <NavLink
              to="https://www.linkedin.com/in/aniket-srivastava-0141b22b8/"
              target="_blank"
            >
              <FaLinkedin className="w-6 h-6 hover:text-blue-600 hover:bg-white  transition duration-300" />
            </NavLink>
            <NavLink to="mailto:aniket08official@gmail.com">
              <CgMail className="w-7 h-7 hover:text-red-600 hover:bg-white rounded-full transition duration-300" />
            </NavLink>
            <NavLink
              to="https://www.instagram.com/aniket_sriv_0810/"
              target="_blank"
            >
              <GrInstagram className="w-6 h-6 hover:text-[#cd486b] transition duration-300" />
            </NavLink>
            <NavLink
              to="https://github.com/aniket-sriv-0810"
              target="_blank"
            >
              <FaGithub className="w-6 h-6 hover:text-gray-500 transition duration-300" />
            </NavLink>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 space-y-4 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} UrbanHaven Hotels.{" "}
            <NavLink to="/" className="text-blue-400 hover:underline">
              All rights reserved.
            </NavLink>
          </p>
          <p className="text-xs text-gray-500">
            Developed and Maintained By:{" "}
            <NavLink
              to="https://www.linkedin.com/in/aniket-srivastava-0141b22b8/"
              target="_blank"
              className="text-cyan-400 hover:underline"
            >
              Aniket Srivastava
            </NavLink>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
