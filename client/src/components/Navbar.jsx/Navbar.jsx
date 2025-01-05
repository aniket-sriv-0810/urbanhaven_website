import React ,{useState} from 'react'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom'
import { IoHomeSharp , IoBusiness} from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";
import './Navbar.css';
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
      await axios.post("http://localhost:8000/api/v1/user/logout", {}, { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };



// console.log("user data: " , user);
  return (
    <>
    <nav className="bg-blue-600 text-white shadow-md">
    <div className="container mx-auto flex justify-between items-center p-4">
    
        {/* Logo and Welcome Message */}
        <div className="flex items-center space-x-4">
        <NavLink to="/" ><img src={WebsiteLogo} className='w-28 ' /></NavLink>
        <h1 className='text-black  text-xl font-semibold' >{user ? `Welcome, ${user.name} to UrbanHaven !` : "Welcome to UrbanHaven !"}</h1>
        </div>

    <ul className="hidden md:flex space-x-8 text-lg">
    <li><NavLink to="/admin" ><MdAdminPanelSettings className='text-2xl text-black font-bold' /></NavLink></li>
    <li><NavLink to="/" ><IoHomeSharp className='text-2xl text-black font-bold'/></NavLink></li>
    <li><NavLink to="/contact" ><FaMapMarkerAlt  className='text-2xl text-black font-bold'/></NavLink></li>
    <li><NavLink to="/api/v1/about" ><IoBusiness className='text-2xl text-black font-bold' />
    </NavLink></li>
    <li><NavLink to={ user ?`/user/${user._id}/account` : '/user/login'} >{user ? <img src={user.image} alt={user.name} className='w-10 -mt-2 rounded-full'/>  : <FaUserCircle className='text-2xl text-black font-bold' />}</NavLink></li>
  

      {user ? (
        <button onClick={handleLogout} className="bg-red-500 p-3  rounded-2xl">
          Logout
        </button>
      ) : (
        <>
          <button onClick={() => navigate("/user/login")} className="bg-green-500 px-4 py-2 rounded-2xl ml-4">
            Login
          </button>
          <button onClick={() => navigate("/user/register")} className="bg-blue-500 px-4 py-2 rounded-2xl ml-4">
            Sign Up
          </button>
        </>
      )}
    </ul>
     {/* Hamburger Icon */}
     <button
     className="md:hidden focus:outline-none"
     onClick={toggleMenu}
   >
     {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
   </button>
    
     {/* Mobile Menu */}
     {isMenuOpen && (
      <ul className="md:hidden bg-blue-700 space-y-4 text-center p-4 text-lg">
      <li><NavLink to="/admin" ><MdAdminPanelSettings className='text-2xl text-black font-bold' /></NavLink></li>
      <li><NavLink to="/" ><IoHomeSharp className='text-2xl text-black font-bold'/></NavLink></li>
      <li><NavLink to="/contact" ><FaMapMarkerAlt  className='text-2xl text-black font-bold'/></NavLink></li>
      <li><NavLink to="/api/v1/about" ><IoBusiness className='text-2xl text-black font-bold' />
      </NavLink></li>
      </ul>
    )}
    </div>
  
  </nav>
    </>
  )
}

export default Navbar;
