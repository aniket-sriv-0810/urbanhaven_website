import React from 'react'
import { useUser } from '../../userContext/userContext';

const AdminHeader = () => {
      const { user, setUser } = useUser();
  return (
    <>
      <h1 className="hidden  sm:text-lg xl:text-sm xs:block xs:text-sm lg:hidden xl:block text-white font-semibold ">
            {user ? `Welcome Admin,  ${user.name} to UrbanHaven ` : 'Welcome to UrbanHaven '}
          </h1>
    </>
  )
}

export default AdminHeader;
