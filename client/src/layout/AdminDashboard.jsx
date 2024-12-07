import React from 'react'
import { useUser } from '../components/userContext/userContext';
import { Outlet, useNavigate  } from 'react-router-dom';
const AdminDashboard = () => {
    const { user } = useUser();
    const navigate = useNavigate();
  return (
    <>
    <h1 className='text-3xl text-black text-center font-bold'>Hello Admin @{user ? ` ${user} !` : "!"}</h1>
    <br/><br/>
    <div className='flex gap-5 mx-4 '>
    <button onClick={()=> navigate('users')} className="bg-green-500 px-4 py-2  text-white  border-gray-900 rounded-lg">Users Details</button><br/><br/>
    <button  onClick={()=> navigate('hotels')} className="bg-green-500 px-4 py-2 rounded-lg text-white ">Hotels Details</button><br/><br/>
    <button disabled onClick={()=> navigate('contacts')} className="bg-green-500 px-4 py-2 rounded-lg text-white ">Contacts Details</button><br/><br/>
    </div>
    <Outlet/>
    </>
  )
}

export default AdminDashboard;
