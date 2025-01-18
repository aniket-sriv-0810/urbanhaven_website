import React, { useEffect, useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import axios from 'axios';
import Review from '../components/Review/Review';
import MapLocation from '../components/MapLocation/MapLocation';
import Amenities from '../components/Amenities/Ammenties';
import Logo from '../assets/webiste_full_logo.png';
import Footer from '../components/Footer/Footer';
import Policies from '../components/Policies/Policies';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import FAQs from '../components/FAQs/FAQs';
import { MdArrowCircleRight } from "react-icons/md";
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
  <div className="container ">
  <h1 className="text-xl text-center sm:text-3xl  md:text-4xl lg:text-5xl font-extrabold mt-8 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-pink-500">
  Check out the Hotel details
  <span className="block mt-2 text-sm md:text-base text-red-500 font-medium animate-bounce">
    Explore amazing amenities and features!
  </span>
</h1>

  <div className="mt-6 ">
    <img
      src={showMyHotel.image}
      alt={showMyHotel.title}
      className="  md:w-[50%] rounded-xl m-auto shadow-lg shadow-gray-800 object-contain"
    />
  </div>
  <div className='flex justify-center items-center'>
  <ImageGallery />
  </div>
    <h2 className="text-3xl font-semibold text-center mt-4">{showMyHotel.title}</h2>
    <p className="text-center text-gray-600 mt-2">
      {avgRating} ⭐ ({reviewCount} reviews)
    </p>
  <ul className=''>
  <div className='ml-20 text-lg'>
  <li><p className='text-xl font-semibold'>About our place :</p> <span className='text-gray-700'>{showMyHotel.description} </span></li>
  <li>Rs {showMyHotel.price}</li>
  <li><p>Amenities Provided : </p><Amenities/></li>
  <li><p>{showMyHotel.city} , {showMyHotel.state} , {showMyHotel.country} </p></li>
  </div>
  <div className='w-[90%] ml-20 border-3  shadow-md shadow-slate-600'><MapLocation hotel={showMyHotel} /></div>
  </ul>
  <Policies/>
  <div className="flex justify-center items-center mt-8 ">
  <Link to={`/hotel/${id}/booking`}>
    <button className="flex text-xl items-center justify-center bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-4 w-80 rounded-full font-bold shadow-md hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500  hover:scale-105 transition-all duration-300">
      <span>Book Now</span>
      <MdArrowCircleRight className="ml-2 text-2xl transition-transform duration-300 group-hover:translate-x-1" />
    </button>
  </Link>
</div>


<div className=' gap-3 mt-5'>
<FAQs/>
<Review/>

<div className='flex gap-5 space-x-6 flex-wrap'>
{reviews  && reviews.length >0 ? reviews.map((reviewsItem) => (
  <div 
    key={reviewsItem._id} 
    className="w-80 max-w-full h-auto shadow-md shadow-black rounded-br-3xl rounded-tr-3xl border-4 p-4 my-2 mx-3 break-words whitespace-pre-wrap"
  >
    <div className="flex  justify-center items-start gap-3">
      <img
        src={reviewsItem.userDetails.image ? reviewsItem.userDetails.image : null}
        alt={`${reviewsItem.userDetails.name}'s profile`}
        className="w-12 h-12 rounded-full relative right-3 shadow-md shadow-black"
      />

      <div>
        <h2 className="text-lg text-center font-semibold">
          {reviewsItem.userDetails.name}
        </h2>
        <p className="text-gray-600">@{reviewsItem.userDetails.username}</p>
      </div>
    </div>
    <ul className="mt-4">
      <div className="mt-2 -mr-3 flex justify-center items-center">
        <fieldset className="starability-slot">
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
                className="cursor-pointer"
              >
                {rate} star{rate > 1 && "s"}
              </label>
            </React.Fragment>
          ))}
        </fieldset>
      </div>
      <li className="text-gray-800 -mt-4 break-words whitespace-pre-wrap">
        {reviewsItem.comment}
      </li>
      <p className="flex justify-end items-end">
        Verified by <img src={Logo} alt="brand-logo" className="w-16 relative top-5" />
      </p>
    </ul>
  </div>
)) : null}


</div>
  </div>
  <div className='flex flex-col justify-center items-center space-y-7'>
  <Link to="/">
  <button className="   bg-purple-600 p-3 text-white w-60 rounded-2xl font-bold ">Home</button>
  </Link>
  <div className="flex justify-center items-center mt-8 ">
  <Link to={`/hotel/${id}/booking`}>
    <button className="flex text-xl items-center justify-center bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-4 w-80 rounded-full font-bold shadow-md hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500  hover:scale-105 transition-all duration-300">
      <span>Book Now</span>
      <MdArrowCircleRight className="ml-2 text-2xl transition-transform duration-300 group-hover:translate-x-1" />
    </button>
  </Link>
</div>
  </div>
</div>
  <Footer/>
  </>
  )
}

export default ShowHotel
