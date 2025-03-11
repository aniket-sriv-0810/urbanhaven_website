import React from 'react'
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SkeletonCard from '../../components/LoadingSkeleton/SkeletonCard';
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
              navigate('/account/deleted/successfully');
            } catch (error) {
              console.log("Error in deleting User" , error);
            }
          }
          deleteUser();
    }, []);

  return (
    <div className='flex justify-center items-center mt-10'><SkeletonCard/></div>
  )
}

export default DeleteUser
