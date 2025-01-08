import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
const ConfirmationPage = () => {
const [bookingDetails , setBookingDetails] = useState();
const {id} = useParams();
 const displayConfirmation = async () => {
    try {
        const response = await axios.get(`http://localhost:8000/api/v1/hotel/${id}/confirmed` , {
            withCredentials : true
        })
        console.log(response.data.data);
    } catch (error) {
        console.error("Confirmation Failure Occurred !" , error);
    }
 }
 useEffect(() => {
    displayConfirmation();
 }, [])

  return (
  <>
  <h1>Confirmation Page !</h1>
  </>
  )
}

export default ConfirmationPage
