import React from 'react'
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
const DeleteUser = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    useEffect(() => {
        const deleteUser = async() => {
            try {
              let response = await axios.delete(`${import.meta.env.VITE_API_URL}/v1/user/${id}/account/delete` ,{
                withCredentials: true,
              });
              console.log(response.data.message);
              navigate('/');
            } catch (error) {
              console.log("Error in deleting User" , error);
            }
          }
          deleteUser();
    }, []);

  return (
    <h1>Deleting the user...</h1>
  )
}

export default DeleteUser
