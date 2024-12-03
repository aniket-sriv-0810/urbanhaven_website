import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import mainLogo from '../../assets/logo_website.png';
import './Navbar.css';
const Navbar = () => {
  return (
    <>
    <div className='border-2 bg-black text-gray-200 h-14'>
    <ul className='flex flex-row justify-end flex-wrap gap-2'>
    <img src={mainLogo} alt="image" className='w-16 h-16 self-start '></img>
    <li className='-mt-1'>
     <Link to="/user/register">
    <button className="border-black border-2 rounded-2xl p-2 w-32 bg-red-500">Sign Up</button>
    </Link>
    </li>
    <li className='-mt-1'>
     <Link to="/user/login">
    <button className="border-black border-2 rounded-2xl p-2 w-32 bg-red-500">Log In</button>
    </Link>
    </li>
    <li className='-mt-1'>
     <Link to="/user/logout">
    <button className="border-black border-2 rounded-2xl p-2 w-32 bg-green-600">Log Out</button>
    </Link>
    </li>
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
