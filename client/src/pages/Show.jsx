import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
const Show = () => {
const {id} = useParams();
const [showMyHotel , setShowMyHotel] = useState(null);
const [loading, setLoading] = useState(true); // Loading state

const showMyHotelDetails = async() => {
  try {
    const response = await axios.get(`http://localhost:8000/api/v1/hotel/${id}`);
    console.log(response.data.showHotel); // Log for debugging
    setShowMyHotel(response.data.showHotel); // Set the hotel data
  } catch (error) {
    console.error("Error fetching hotel details:", error); // Handle errors gracefully
  } finally {
    setLoading(false); // Stop loading after fetch (whether successful or not)
  }
};

useEffect( () => {
  showMyHotelDetails();
} , [id])

  // Handle loading state
  if (loading) {
    return <p>Loading hotel details...</p>;
  }

  // Handle the case when no hotel data is found
  if (!showMyHotel) {
    return <p>Hotel not found or an error occurred.</p>;
  }
  return (
  <>
  <h1>This is a Show Page</h1>
  <div>
  <img src={showMyHotel.image} alt={ showMyHotel.title} className='w-60 rounded-lg m-2' />
  <li>{showMyHotel.title}</li>
  <li>{showMyHotel.description}</li>
  <li>Rs {showMyHotel.price}</li>
  <li><p>{showMyHotel.city} , {showMyHotel.state} , {showMyHotel.country} </p></li>
  <Link to="/">
  <button className="border-gray-500 border-2">Home</button>
  </Link>
  </div>

  </>
  )
}

export default Show
