import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../userContext/userContext';

const Logout = () => {
  const {setUser} = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/v1/user/logout` , {withCredentials: true});
        console.log(response.data.message);  // Handle success message or user info
        setUser(null); // Reset user state
        localStorage.removeItem("user"); // Remove user data from localStorage
        navigate('/');  // Redirect to home page after successful logout
      } catch (error) {
        console.error('Logout failed', error);
      }
    };

    logoutUser();
  }, [setUser]);

  return (
    <div>
      <h1>Logging you out...</h1>
    </div>
  );
};

export default Logout;
