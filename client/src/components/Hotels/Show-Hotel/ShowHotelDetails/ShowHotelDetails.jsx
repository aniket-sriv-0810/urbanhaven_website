import React from 'react';
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineStar  } from "react-icons/md";
import BookingBtn from '../BookingBtn/BookingBtn';

const ShowHotelDetails = ({ hotel, avgRating, reviewCount }) => {
 
  return (
    <div className="max-w-5xl mx-auto my-20 px-4 py-8" data-aos="fade-up">
      <h2 className="text-3xl uppercase font-bold text-center mt-4">{hotel? hotel.title : null}</h2>
      <p className="flex justify-center text-lg text-center text-gray-600 mt-2">
        {avgRating} <MdOutlineStar className='text-3xl mx-2 text-yellow-400' /> ({reviewCount} reviews)
      </p>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">About our Place</h1>
        <p className="text-gray-700 text-justify text-lg mb-6">{ hotel ? hotel.description : null}</p>
        <p className="text-xl font-medium text-gray-800 mb-6">
          For <span className="text-green-600 font-bold">Rs { hotel ? (hotel.price).toLocaleString("INR") : null} </span>
          <span className="text-sm text-gray-500 font-normal"> /- per night</span>
        </p>
        <p className="text-lg text-gray-600 mb-4 flex items-center gap-x-2">
          <FaMapMarkerAlt className='text-red-500 w-5 h-5 ' /> { hotel ? hotel.city : null }, { hotel ? hotel.state : null}, { hotel ? hotel.country : null}
        </p>
        <div className='my-12'>
      <BookingBtn hotel={hotel}/>
        </div>
        </div>
    </div>
  );
};

export default ShowHotelDetails;
