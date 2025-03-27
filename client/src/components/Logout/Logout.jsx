import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../userContext/userContext';
const Logout = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/v1/user/logout`,
          {}, // Empty body
          { withCredentials: true } // Proper placement
        );
        setUser(null);
        localStorage.removeItem("user"); 
        navigate('/'); 
      } catch (error) {
        console.error("Failed to logout now ! Please try again later ");

      }
    };

    logoutUser();
  }, [setUser, navigate]);

  return null
};

export default Logout;
