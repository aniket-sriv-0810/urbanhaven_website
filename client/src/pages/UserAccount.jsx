import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserAccount = () => {
  const [showUser, setShowUser] = useState(null);  // Initial state is null
  const { id } = useParams();

  const userDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/user/${id}/account`);
      if (!response) {
        console.log("Error getting user!");
      }

      console.log(response.data);
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
          <li>ID: {showUser._id}</li>
          <li>Name: {showUser.name}</li>
          <li>Username: {showUser.username}</li>
          <li>Phone: {showUser.phone}</li>
          <li>Email: {showUser.email}</li>
        </>
      ) : (
        <p>Loading user details...</p> // Display loading message if user data is not yet fetched
      )}
    </>
  );
};

export default UserAccount;
