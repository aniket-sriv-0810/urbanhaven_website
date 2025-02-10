import React from "react";
import Logo from "../../assets/main-logo.png";
import { NavLink } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa6";
import { CgMail } from "react-icons/cg";
import { GrInstagram } from "react-icons/gr";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 py-12">
      <div className="container mx-auto px-5 md:px-10 lg:px-16">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start lg:space-x-12">
          {/* Logo Section */}
          <div className="flex items-center lg:items-start">
            <img
              src={Logo}
              alt="Logo"
              className="w-28 -mt-5 transition-transform duration-300 hover:scale-110"
            />
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-wrap justify-center items-center sm:mb-8 space-x-6  md:space-x-8 text-sm lg:text-base  lg:relative lg:left-10 lg:top-5">
            {["Home", "About", "Contact", "Policies", "Show"].map((item, index) => (
              <li key={index} className="relative">
                <NavLink
                  to={`/${item.toLowerCase()}`}
                  className="hover:text-blue-400 transition duration-300 relative group"
                >
                  {item}
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-6 mt-8 sm:mt-0">
            {[
              { icon: FaLinkedin, link: "https://www.linkedin.com/in/aniket-srivastava-0141b22b8/", color: "bg-blue-600" },
              { icon: CgMail, link: "mailto:aniket08official@gmail.com", color: "bg-red-600" },
              { icon: GrInstagram, link: "https://www.instagram.com/aniket_sriv_0810/", color: "bg-pink-500" },
              { icon: FaGithub, link: "https://github.com/aniket-sriv-0810", color: "bg-gray-600" },
            ].map(({ icon: Icon, link, color }, index) => (
              <NavLink
                key={index}
                to={link}
                target="_blank"
                aria-label="Social Link"
                className={`p-2 bg-gray-700 rounded-full hover:${color} transition duration-300 shadow-lg transform hover:-translate-y-1`}
              >
                <Icon className="w-6 h-6 text-white" />
              </NavLink>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-700"></div>

        {/* Bottom Section */}
        <div className="text-center space-y-3">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()}{" "}
            <span className="text-blue-400">UrbanHaven Hotels</span>. All rights reserved.
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
