import React from 'react'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom'
import { IoHomeSharp , IoBusiness} from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import './Navbar.css';
import { useUser } from '../userContext/userContext';
const Navbar = () => {

  const { user, setUser } = useUser();
  const navigate = useNavigate()



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
    <header className="p-4 bg-green-200 text-white flex justify-between items-center">
    <h1 className='text-black text-xl font-semibold' >{user ? `Welcome, ${user.name.toUpperCase()} to UrbanHaven !` : "Welcome to UrbanHaven !"}</h1>
    <p className='text-purple-700'>id:{user ?user._id : "Not Logged in yet"}</p>
    <div>
    <ul className='flex flex-row justify-end flex-wrap gap-2'>
    <li><NavLink to="/" ><IoHomeSharp className='text-2xl text-black font-bold'/></NavLink></li>
    <li><NavLink to="/contact" ><FaMapMarkerAlt  className='text-2xl text-black font-bold'/></NavLink></li>
    <li><NavLink to="/api/v1/about" ><IoBusiness className='text-2xl text-black font-bold' />
    </NavLink></li>
    <li><NavLink to={ user ?`/user/${user._id}/account` : '/user/login'} ><FaUserCircle className='text-2xl text-black font-bold' /></NavLink></li>
  

      {user ? (
        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-2xl">
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
    </div>
  </header>

    </>
  )
}

export default Navbar
