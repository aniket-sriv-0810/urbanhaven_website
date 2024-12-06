import React from 'react'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom'
import mainLogo from '../../assets/logo_website.png';
import './Navbar.css';
import { useUser } from '../userContext/userContext';
const Navbar = () => {

  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/v1/user/logout", {}, { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <>
    <header className="p-4 bg-blue-600 text-white flex justify-between items-center">
    <h1>{user ? `Welcome, ${user}` : "Guest"}</h1>
    <div>
      {user ? (
        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
          Logout
        </button>
      ) : (
        <>
          <button onClick={() => navigate("/user/login")} className="bg-green-500 px-4 py-2 rounded">
            Login
          </button>
          <button onClick={() => navigate("/user/register")} className="bg-blue-500 px-4 py-2 rounded">
            Sign Up
          </button>
        </>
      )}
    </div>
  </header>
    <div className='border-2 bg-black text-gray-200 h-14'>
    <ul className='flex flex-row justify-end flex-wrap gap-2'>
    <img src={mainLogo} alt="image" className='w-16 h-16 self-start '></img>
    <li><NavLink to="/" >Home</NavLink></li>
    <li><NavLink to="/new" >Create</NavLink></li>
    <li><NavLink to="/contact" >Contact</NavLink></li>
    <li><NavLink to="/api/v1/about" >About</NavLink></li>

    </ul>
    </div>
    </>
  )
}

export default Navbar
