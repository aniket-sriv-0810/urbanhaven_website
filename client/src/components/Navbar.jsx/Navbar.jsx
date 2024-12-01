import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css';
const Navbar = () => {
  return (
    <>
    <div className='border-2 bg-blue-600 text-gray-200 h-14'>
    <ul className='flex flex-row justify-end  gap-2'>
    <li><NavLink to="/" >Home</NavLink></li>
    <li><NavLink to="/api/v1/new" >Create</NavLink></li>
    <li><NavLink to="/api/v1/contact" >Contact</NavLink></li>
    <li><NavLink to="/api/v1/about" >About</NavLink></li>
    <li><NavLink to="/api/v1/hotel/:id/edit" >Edit</NavLink></li>
    </ul>
    </div>
    </>
  )
}

export default Navbar
