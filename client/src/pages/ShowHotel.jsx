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
import Navbar from '../components/Navbar.jsx/Navbar';
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
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
  <div className='bg-gradient-to-r from-violet-600 to-indigo-600'>
  <Navbar/>
  </div>
  <div className="container ">
  <h1 className="text-xl text-center  w-max m-auto shadow-black sm:text-3xl  md:text-4xl lg:text-5xl font-extrabold mt-10 mb-10 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-pink-600">
  Check out the Hotel details
  <span className="block mt-2 text-sm md:text-base text-red-500 font-semibold animate-bounce">
    Explore amazing amenities and features!
  </span>
</h1>

  <div className="mb-20 mt-20 md:w-[65%] m-auto">
    <img
      src={showMyHotel.image}
      alt={showMyHotel.title}
      className=" rounded-xl  shadow-xl shadow-gray-900 object-contain"
    />
  </div>
  <div className='border-red-500 border-2 my-20 flex justify-center items-center'>
  <ImageGallery />
  </div>
    <h2 className="text-3xl uppercase font-bold text-center mt-4">{showMyHotel.title}</h2>
    <p className="text-center text-gray-600 mt-2">
      {avgRating} ⭐ ({reviewCount} reviews)
    </p>
  <ul className=''>
  <div className="max-w-5xl mx-auto my-20 border-red-500 border-2 px-4 py-8">
      {/* Hotel Details Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          About Our Place:
        </h1>
        <p className="text-gray-700 text-justify text-lg mb-6">
          {showMyHotel.description}
        </p>
        <p className="text-xl font-medium text-gray-800 mb-6">
          For <span className="text-green-600 font-bold">Rs {(showMyHotel.price).toLocaleString("INR")} </span>
          <span className="text-sm text-gray-500 font-normal"> /- per night <br />
                  </span>
        </p>
        <p className="text-lg text-gray-600 mb-4 flex items-center gap-x-2">
          <FaMapMarkerAlt className='text-red-500 w-5 h-5 ' />{showMyHotel.city}, {showMyHotel.state}, {showMyHotel.country}
        </p>
      </div>

      {/* Amenities Section */}
      <Amenities />
    </div>
  <div className='border-red-500 border-2 my-60 w-[90%] m-auto border-3  shadow-md shadow-slate-600'><MapLocation hotel={showMyHotel} /></div>
  </ul>
  <div className='border-2 border-red-500 my-40'>
  <Policies/>
  </div>
  <div className="flex justify-center items-center">
      <Link to={`/hotel/${id}/booking`}>
        <button className="flex items-center justify-center text-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-4 w-72 md:w-80 rounded-full font-bold shadow-lg hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:shadow-xl hover:scale-105 transition-all duration-300">
          <span className="group">Book Now</span>
          <MdArrowCircleRight className="ml-2 text-2xl transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </Link>
    </div>

<div className='border-red-500 border-2 my-80'>
<FAQs/>
</div>
<div className='border-red-500 border-2 my-20'>
<Review/>
</div>

<div className="my-40 border-red-500 border-2 flex flex-wrap gap-8 justify-center py-10 bg-gradient-to-b from-gray-50 to-white">
  {reviews && reviews.length > 0 ? (
    reviews.map((reviewsItem) => (
      <div
        key={reviewsItem._id}
        className=" w-full sm:w-80 max-w-full bg-white shadow-lg rounded-2xl border border-gray-200 p-6 transition-transform transform hover:scale-105 hover:shadow-2xl"
      >
        {/* User Info */}
        <div className="flex items-center gap-4">
          <img
            src={reviewsItem.userDetails ? reviewsItem.userDetails.image : null}
            alt={
              reviewsItem.userDetails
                ? `${reviewsItem.userDetails.name}'s profile`
                : "User profile"
            }
            className="w-12 h-12 rounded-full shadow-md"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {reviewsItem.userDetails ? reviewsItem.userDetails.name : "Anonymous"}
            </h2>
            <p className="text-sm text-gray-600">
              @{reviewsItem.userDetails ? reviewsItem.userDetails.username : "unknown"}
            </p>
          </div>
        </div>

        {/* Star Rating */}
        <div className="flex justify-center items-center mt-4">
          {[1, 2, 3, 4, 5].map((rate) => (
            <span
              key={rate}
              className={`text-xl ${
                reviewsItem.rating >= rate ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        {/* Comment */}
        <p className="mt-4 text-gray-700 whitespace-pre-wrap break-words">
          {reviewsItem.comment}
        </p>

        {/* Verified Badge */}
        <div className="  flex justify-end items-center mt-6">
          <p className="text-sm text-gray-600">Verified by</p>
          <img
            src={Logo}
            alt="Brand logo"
            className="w-16 ml-2"
          />
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-600 text-lg">No reviews available at the moment.</p>
  )}
</div>



  <div className='my-20 flex flex-col justify-center items-center space-y-10'>
  <Link to="/">
  <button className="flex items-center justify-center space-x-5 bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-6 py-3 w-80 rounded-full font-bold shadow-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 transform hover:scale-105 transition-all duration-300">
    <span>Home</span>
      <IoHome className="ml-2 text-2xl transition-transform duration-300 group-hover:translate-x-1" />
  </button>
</Link>

  <div className="flex justify-center items-center mt-8">
  <Link to={`/hotel/${id}/booking`}>
    <button className="flex text-xl items-center justify-center bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-4 w-80 rounded-full font-bold shadow-md hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500  hover:scale-105 transition-all duration-300  mb-10">
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
