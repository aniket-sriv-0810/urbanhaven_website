import React from 'react'
import { useUser } from '../../userContext/userContext';
const Header = () => {
    const {user} = useUser();
  return (
   <>
   <h1 className="text-base mt-10 sm:text-2xl p-2   xs:hidden lg:block lg:mt-10 xl:hidden text-center text-gray-800 font-semibold ">
   <p >Welcome <span className='text-yellow-600'>{user ? user.name : null}</span> to UrbanHaven ! </p>
 </h1>
   </>
  )
}

export default Header
