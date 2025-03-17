import React from 'react'
import {  MdHotel } from "react-icons/md";
import {useNavigate} from "react-router-dom";
const BookingBtn = ({hotel}) => {
    const navigate = useNavigate();
  return (
    <div className='flex justify-center items-center'>
          <button className='flex items-center justify-center gap-5 w-60 py-3 text-lg font-bold text-white bg-gradient-to-t from-red-500 to-purple-600 rounded-full shadow-lg hover:from-purple-600 hover:to-red-700 hover:shadow-gray-600 hover:scale-105 transition-all' 
          onClick={() => navigate(`/hotel/${hotel._id}/booking`)}>
          Book Now
          <MdHotel className='text-2xl'/>
          </button>
      </div>
  )
}

export default BookingBtn
