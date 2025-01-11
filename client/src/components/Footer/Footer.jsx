import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
        {/* Logo Section */}
        <div className="flex flex-col items-center md:items-start space-y-4 md:space-y-0 md:flex-row md:space-x-4">
          <img
            src="/path-to-your-logo.png"
            alt="Logo"
            className="h-12 w-12 object-contain"
          />
          <span className="text-lg font-semibold tracking-wide">
            Your Website
          </span>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center space-x-6 text-sm">
          <li>
            <a href="#home" className="hover:text-blue-400 transition duration-300">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-blue-400 transition duration-300">
              About
            </a>
          </li>
          <li>
            <a href="#services" className="hover:text-blue-400 transition duration-300">
              Services
            </a>
          </li>
          <li>
            <a href="#blog" className="hover:text-blue-400 transition duration-300">
              Blog
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-blue-400 transition duration-300">
              Contact
            </a>
          </li>
        </ul>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition duration-300"
          >
            <i className="fab fa-linkedin-in"></i> LinkedIn
          </a>
          <a
            href="mailto:your-email@gmail.com"
            className="hover:text-red-400 transition duration-300"
          >
            <i className="fas fa-envelope"></i> Gmail
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition duration-300"
          >
            <i className="fab fa-instagram"></i> Instagram
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition duration-300"
          >
            <i className="fab fa-github"></i> Github
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Your Website. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
