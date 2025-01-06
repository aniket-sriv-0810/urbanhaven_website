import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 px-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <img src="/path-to-your-logo.png" alt="Logo" className="h-12 w-12" />
          <span className="text-lg font-bold">Your Website</span>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-sm">
          <li>
            <a href="#home" className="hover:text-blue-400">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-blue-400">
              About
            </a>
          </li>
          <li>
            <a href="#services" className="hover:text-blue-400">
              Services
            </a>
          </li>
          <li>
            <a href="#blog" className="hover:text-blue-400">
              Blog
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-blue-400">
              Contact
            </a>
          </li>
        </ul>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
           LinkedIn
          </a>
          <a
            href="mailto:your-email@gmail.com"
            className="hover:text-red-400"
          >
           Gmail
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400"
          >
          Instagram
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            Github
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Your Website. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
