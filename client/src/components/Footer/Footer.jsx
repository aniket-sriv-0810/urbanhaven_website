import React from "react";
import Logo from '../../assets/main-logo.png';
import { NavLink } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa6";
import { CgMail } from "react-icons/cg";
import { GrInstagram } from "react-icons/gr";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start lg:space-x-12  lg:space-y-0">
          {/* Logo Section */}
          <div className="flex flex-col items-center lg:items-start">
            <img src={Logo} alt="Logo" className="w-24 -mt-8" />
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-wrap justify-center items-center space-x-6 md:space-x-8 text-sm lg:text-base">
            <li>
              <NavLink
                to="/"
                className="hover:text-blue-400 transition duration-300"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="hover:text-blue-400 transition duration-300"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className="hover:text-blue-400 transition duration-300"
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/policies"
                className="hover:text-blue-400 transition duration-300"
              >
                Policies
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/show"
                className="hover:text-blue-400 transition duration-300"
              >
                Show
              </NavLink>
            </li>
          </ul>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-6 mt-8 sm:mt-0">
            <NavLink
              to="https://www.linkedin.com/in/aniket-srivastava-0141b22b8/"
              target="_blank"
              aria-label="LinkedIn"
              className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition duration-300"
            >
              <FaLinkedin className="w-6 h-6 text-white" />
            </NavLink>
            <NavLink
              to="mailto:aniket08official@gmail.com"
              aria-label="Email"
              className="p-2 bg-gray-800 rounded-full hover:bg-red-600 transition duration-300"
            >
              <CgMail className="w-6 h-6 text-white" />
            </NavLink>
            <NavLink
              to="https://www.instagram.com/aniket_sriv_0810/"
              target="_blank"
              aria-label="Instagram"
              className="p-2 bg-gray-800 rounded-full hover:bg-pink-500 transition duration-300"
            >
              <GrInstagram className="w-6 h-6 text-white" />
            </NavLink>
            <NavLink
              to="https://github.com/aniket-sriv-0810"
              target="_blank"
              aria-label="GitHub"
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-600 transition duration-300"
            >
              <FaGithub className="w-6 h-6 text-white" />
            </NavLink>
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 border-t border-gray-700"></div>

        {/* Bottom Section */}
        <div className="text-center space-y-3">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()}{" "}
            <span className="text-blue-400">UrbanHaven Hotels</span>. All rights
            reserved.
          </p>
          <p className="text-sm text-gray-500">
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
