import React from 'react'
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SkeletonCard from "../../../components/LoadingSkeleton/SkeletonCard";
const DeleteHotel = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    useEffect(() => {
        const deleteHotel = async() => {
            try {
              let response = await axios.delete(`${import.meta.env.VITE_API_URL}/v1/admin/hotel/${id}/delete` ,{
                withCredentials: true,
              });
              console.log(response.data.message);
              navigate('/delete/successfully');
            } catch (error) {
              console.log("Error in deleting hotel" , error);
            }
          }
          deleteHotel();
    }, []);

  return (
    <h1 className='flex justify-center items-center mt-10'><SkeletonCard/></h1>
  )
}

export default DeleteHotel
