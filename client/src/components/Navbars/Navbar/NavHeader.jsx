import React from 'react'
import { useUser } from '../../userContext/userContext'

const NavHeader = () => {
      const { user } = useUser();
  return (
    <div>
      <h1 className="hidden xs:block xs:text-xs sm:text-lg sm:block lg:hidden xl:block text-white font-semibold truncate">
            <p >Welcome <span className='text-yellow-300'>{user ? user.name : null}</span> to UrbanHaven ! </p>
          </h1>
    </div>
  )
}

export default NavHeader
