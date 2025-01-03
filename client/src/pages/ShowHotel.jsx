import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import Review from '../components/Review/Review';
import MapLocation from '../components/MapLocation/MapLocation';
import Amenities from '../components/Amenities/Ammenties';
import Logo from '../assets/webiste_full_logo.png';
const ShowHotel = () => {
const {id} = useParams();
const [reviews, setReviews] = useState();
const [showMyHotel , setShowMyHotel] = useState(null);
const [loading, setLoading] = useState(true); // Loading state
const [reviewCount , setReviewCount] = useState(0);
const [avgRating , setAvgRating] = useState(0);
const showMyHotelDetails = async() => {
  try {
    const response = await axios.get(`http://localhost:8000/api/v1/hotel/${id}` ,{
      withCredentials: true,
    });
    console.log("Review => " ,response.data.data.allReviews);
    console.log(response.data.message); // Log for debugging
    setReviews(response.data.data.allReviews);
    setShowMyHotel(response.data.data.showHotel); // Set the hotel data
    setReviewCount(response.data.data.totalReviews);
    setAvgRating(response.data.data.avgRating);
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
  <div className='flex flex-col border-2 border-black w-max m-auto '>
  <ul className='text-center '>
  <img src={showMyHotel.image} alt={ showMyHotel.title} className='w-[70%] rounded-2xl mt-4 m-auto p-2 border-3 border-black' />
  <li className='font-semibold text-2xl uppercase'>{showMyHotel.title}</li><span><p className=' w-max m-auto p-2 rounded-xl border-2 border-black'>{avgRating} ⭐</p> ({reviewCount} reviews)</span>
  <li>{showMyHotel.description} </li>
  <li>Rs {showMyHotel.price}</li>
  <li><p>{showMyHotel.city} , {showMyHotel.state} , {showMyHotel.country} </p></li>
  </ul>
  <br/>
<br/><br/>

<Amenities/>
<MapLocation hotel={showMyHotel} />

<br></br>
<div className=' gap-3'>
<Review/>

{ reviews ? reviews.map((reviewsItem) => (
  <div key={reviewsItem._id} className="border-2 border-black rounded-lg  p-4 my-2 ">
    <div className="flex  justify-center items-center space-x-4">
      <img
        src={reviewsItem.userDetails.image}
        alt={`${reviewsItem.userDetails.name}'s profile`}
        className="w-12 h-12 rounded-full"
      />
      <div>
        <h2 className="text-lg font-semibold">
          By: {reviewsItem.userDetails.name}
        </h2>
        <p className="text-gray-600">@{reviewsItem.userDetails.username}</p>
      </div>
    </div>
    <ul className="mt-2 text-center">
    <div className="mt-2 flex  justify-center items-center">
    <fieldset className="starability-slot">
      <legend>Rating:</legend>
      <input
        type="radio"
        id={`no-rate-${reviewsItem._id}`}
        className="input-no-rate"
        name={`rating-${reviewsItem._id}`}
        value="0"
        checked={reviewsItem.rating === 0}
        disabled
        aria-label="No rating."
      />
      {[1, 2, 3, 4, 5].map((rate) => (
        <React.Fragment key={rate}>
          <input
            type="radio"
            id={`rate-${rate}-${reviewsItem._id}`}
            name={`rating-${reviewsItem._id}`}
            value={rate}
            checked={reviewsItem.rating === rate}
            disabled
          />
          <label
            htmlFor={`rate-${rate}-${reviewsItem._id}`}
            title={
              rate === 1
                ? "Terrible"
                : rate === 2
                ? "Not good"
                : rate === 3
                ? "Average"
                : rate === 4
                ? "Very good"
                : "Amazing"
            }
          >
            {rate} star{rate > 1 && "s"}
          </label>
        </React.Fragment>
      ))}
    </fieldset>
  </div>
      <li className="text-gray-800">Commented: {reviewsItem.comment}</li>
      <p className='flex justify-end mt-2 '>Verified by <img src={Logo} alt="brand-logo" className='w-16 -mt-5'/></p>
    </ul>
  </div>
)) : null}

  </div>
  <Link to="/">
  <button className="border-gray-500 border-2 bg-purple-600 p-3 text-white w-40 rounded-2xl font-bold ">Home</button>
  </Link>
  </div>
  </>
  )
}

export default ShowHotel
