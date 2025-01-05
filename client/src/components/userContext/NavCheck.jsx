import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const NavCheck = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo and Welcome Message */}
        <div className="flex items-center space-x-4">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-10 w-10 rounded-full"
          />
          <span className="text-xl font-bold">Welcome, User!</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg">
          <li><a href="#about" className="hover:underline">About Us</a></li>
          <li><a href="#contact" className="hover:underline">Contact Us</a></li>
          <li><a href="#admin" className="hover:underline">Admin</a></li>
          <li><a href="#account" className="hover:underline">Account</a></li>
        </ul>

        {/* Hamburger Icon */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden bg-blue-700 space-y-4 text-center p-4 text-lg">
          <li><a href="#about" className="hover:underline">About Us</a></li>
          <li><a href="#contact" className="hover:underline">Contact Us</a></li>
          <li><a href="#admin" className="hover:underline">Admin</a></li>
          <li><a href="#account" className="hover:underline">Account</a></li>
        </ul>
      )}
    </nav>
  );
};

export default NavCheck;
