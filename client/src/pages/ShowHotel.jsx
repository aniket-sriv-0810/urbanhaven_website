import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import Review from '../components/Review/Review';

const ShowHotel = () => {
const {id} = useParams();
const [reviews, setReviews] = useState();
const [showMyHotel , setShowMyHotel] = useState(null);
const [loading, setLoading] = useState(true); // Loading state

const showMyHotelDetails = async() => {
  try {
    const response = await axios.get(`http://localhost:8000/api/v1/hotel/${id}` ,{
      withCredentials: true,
    });
    console.log("Review => " ,response.data.data.allReviews);
    console.log(response.data.message); // Log for debugging
    setReviews(response.data.data.allReviews);
    setShowMyHotel(response.data.data.showHotel); // Set the hotel data
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
  <br/>
<br/><br/>
<Review/>
<div className='flex flex-row flex-wrap justify-center gap-3'>
   
{ reviews.map((reviewsItem) =>(

        <div key={reviewsItem._id} className='border-2 border-black rounded-lg w-max'>
      <ul className='text-center' >
      <h2>By : {reviewsItem.name}</h2>
      <li>{reviewsItem.rating} Stars</li>
      <li>Commented : {reviewsItem.comment}</li>
      </ul>
      </div>
)
    )
  }
  </div>
  <Link to="/">
  <button className="border-gray-500 border-2">Home</button>
  </Link>
  </div>
  </>
  )
}

export default ShowHotel
