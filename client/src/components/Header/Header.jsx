import React from 'react'
import { useUser } from '../userContext/userContext';
const Header = () => {
    const {user} = useUser();
  return (
   <>
   <h1 className="text-sm sm:text-2xl sm:hidden lg:block xl:hidden text-center m-3 text-black font-semibold truncate">
   {user ? `Welcome, ${user.name} to UrbanHaven!` : 'Welcome to UrbanHaven!'}
 </h1>
   </>
  )
}

export default Header
