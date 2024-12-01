import React from 'react'
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
const Delete = ({id}) => {

  const navigate = useNavigate();
  const deleteHotel = async() => {
    try {
      let response = await axios.delete(`http://localhost:8000/api/v1/hotel/${id}/delete`);
      console.log(response.data.msg);
      navigate('/')
    } catch (error) {
      console.log("Error in deleting hotel" , error);
    }
  }
  return (
    <>
    <button className="border-gray-500 border-2" onClick={deleteHotel}>Delete Hotel</button>
    </>
  )
}

export default Delete
