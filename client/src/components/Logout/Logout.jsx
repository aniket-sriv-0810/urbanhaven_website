import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/v1/user/logout');
        console.log(response.data.message);  // Handle success message or user info
        navigate('/');  // Redirect to home page after successful logout
      } catch (error) {
        console.error('Logout failed', error);
      }
    };

    logoutUser();
  }, [navigate]);

  return (
    <div>
      <h1>Logging you out...</h1>
    </div>
  );
};

export default Logout;
