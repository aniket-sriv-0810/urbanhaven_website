import React from 'react'

const UserDashBoard = () => {

  return (
   <>
   <div className='w-max' >
   <ul className='w-max  py-16'>
   <li className='py-5  text-center w-full bg-purple-500 rounded-xl mt-3 text-white'>Details</li>
   <li className='py-5  text-center w-full bg-purple-500 rounded-xl mt-3 text-white'>Wishlist</li>
   <li className='py-5  text-center w-full bg-purple-500 rounded-xl mt-3 text-white'>My Bookings</li>
   <li className='py-5  text-center w-full bg-purple-500 rounded-xl mt-3 text-white'>logout</li>
   <li className='py-5  text-center w-full bg-purple-500 rounded-xl mt-3 text-white'>Delete Account</li>
   </ul>
   </div>
   </>
  )
}

export default UserDashBoard
