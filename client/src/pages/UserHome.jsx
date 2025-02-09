import React from 'react'
import { Outlet } from 'react-router-dom'
import UserNavbar from '../components/Navbars/UserNavbar/UserNavbar'


const UserHome = () => {
  return (
    <div>
    <UserNavbar/>
      <div className="w-full mt-10" data-aos="fade-up">
                <Outlet />
              </div>
    </div>
  )
}

export default UserHome
