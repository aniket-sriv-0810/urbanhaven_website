import React from 'react'
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
const Delete = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    useEffect(() => {
        const deleteHotel = async() => {
            try {
              let response = await axios.delete(`http://localhost:8000/api/v1/admin/hotel/${id}/delete` ,{
                withCredentials: true,
              });
              console.log(response.data.message);
              navigate('/admin/hotels');
            } catch (error) {
              console.log("Error in deleting hotel" , error);
            }
          }
          deleteHotel();
    }, []);

  return (
    <h1>Deleting the hotel...</h1>
  )
}

export default Delete
