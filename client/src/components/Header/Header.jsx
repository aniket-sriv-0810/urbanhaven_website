import React from 'react'
import { useUser } from '../userContext/userContext';
const Header = () => {
    const {user} = useUser();
  return (
   <>
   <h1 className="text-base sm:text-2xl p-2 mb-5 mt-2 sm:hidden lg:block xl:hidden text-center text-gray-800 font-semibold ">
   <p data-aos="fade-down">Welcome <span className='text-yellow-600'>{user ? user.name : null}</span> to UrbanHaven ! </p>
 </h1>
   </>
  )
}

export default Header
