import React from 'react'
import { useUser } from '../userContext/userContext';
const Header = () => {
    const {user} = useUser();
  return (
   <>
   <h1 className="text-sm sm:text-2xl mt-5 mb-5 sm:hidden lg:block xl:hidden text-center text-gray-800 font-semibold ">
   {user ? `Welcome, ${user.name} to Urbanhaven ! ` : 'Welcome to Urbanhaven !'}
 </h1>
   </>
  )
}

export default Header
