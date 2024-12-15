import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UserAccount = () => {
  const [showUser, setShowUser] = useState(null);  // Initial state is null
  const { id } = useParams();
  const navigate = useNavigate();
  const userDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/user/${id}/account`);
      if (!response) {
        console.log("Error getting user!");
      }

      console.log(response.data.data.userInfo);
      setShowUser(response.data.data.userInfo);
    } catch (error) {
      console.error("Failed to get user", error);
    }
  };

  useEffect(() => {
    userDetails();
  }, [id]); // Added id as a dependency to fetch data if id changes

  return (
    <>
      <h1>Hi User!</h1>
      {showUser ? (
        <>
        <div className='flex  justify-center flex-col items-center text-white font-medium text-lg m-auto w-max'>
        <ul className='border-black border-2 rounded-xl p-3  bg-gray-600 '>
        <img src={showUser.image} alt={showUser.name} className='w-40 rounded-full m-auto border-2 border-black' />
          <li>ID: {showUser._id}</li>
          <li>Name: {showUser.name.toUpperCase()}</li>
          <li>Username: {showUser.username}</li>
          <li>Phone: {showUser.phone}</li>
          <li>Email: {showUser.email}</li>
          <button onClick={()=> navigate("edit") } className="bg-green-500 px-4 py-2 rounded-2xl" >Edit Details</button>
          <button onClick={()=> navigate("delete") } className="bg-red-500 px-4 py-2 rounded-2xl ">Delete Account</button>
          </ul>
          
          </div>
        </>
      ) : (
        <p>Loading user details...</p> // Display loading message if user data is not yet fetched
      )}
      
    </>
  );
};

export default UserAccount;
