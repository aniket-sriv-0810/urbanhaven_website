import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaHotel } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import LikeBtn from "../LikeBtn/LikeBtn";
import ShareBtn from "../ShareBtn/ShareBtn";
import { useUser } from "../userContext/userContext";
import ReviewCount from "../Review/ReviewCount";

const currencySymbols = {
  INR: "₹",
  USD: "$",
  EURO: "€",
  POUND: "£",
};

const HotelDetails = ({ hotel, conversionRate = 1 , selectedCurrency = "INR" }) => {
  const { user } = useUser();

  const convertedPrice = (hotel.price * conversionRate).toFixed(2);
  const convertedTax = (0.18 * hotel.price * conversionRate).toFixed(2);

  const priceDisplay = `${currencySymbols[selectedCurrency]} ${convertedPrice}`;
  const taxDisplay = `${currencySymbols[selectedCurrency]} ${convertedTax}`;

  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-2xl w-full sm:w-96 md:w-80 hover:shadow-lg transition-transform transform ">
    <div className="relative">
      <div className="absolute top-3 left-3 z-20 hover:cursor-pointer">
        <ShareBtn hotelName={hotel.title} hotelLink={`${import.meta.env.VITE_API_URL}/hotel/${hotel.id}`} />
      </div>
      <div className="absolute top-1 right-3 z-20 text-white hover:cursor-pointer">
        <LikeBtn id={user ? user._id : null} hotelId={hotel ? hotel._id : null} />
      </div>
      <img src={hotel.image} alt={hotel.title} className="rounded-t-2xl h-56 w-full object-cover" />
    </div>
  
    <div className="p-5">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{hotel.title}</h2>
  
      {/* Improved Review Count Component - Aligned Beautifully */}
      <ReviewCount id={hotel._id} />
  
      <p className="flex text-gray-600 mt-2 text-sm sm:text-base">
        <FaMapMarkerAlt className="-mx-1 mt-1 text-red-500" /> 
        <span className="px-2"> {hotel.city}, {hotel.state}, {hotel.country}</span>
      </p>
  
      <p className="text-lg font-semibold text-gray-700 mt-4">
        {priceDisplay}
        <span className="text-sm text-gray-400 font-normal"> /- per night <br />+ {taxDisplay} taxes</span>
      </p>
  
      <div className="flex justify-between mt-5">
        <Link to={`/hotel/${hotel._id}`}>
          <button className="flex bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-transform transform hover:scale-105 shadow-md hover:shadow-md hover:shadow-slate-700">
            View <TbListDetails className="ml-2 mt-1" />
          </button>
        </Link>
        <Link to={`/hotel/${hotel._id}/booking`}>
          <button className="bg-red-500 text-white flex px-4 py-2 rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105 shadow-md hover:shadow-md hover:shadow-slate-700">
            Book Now <FaHotel className="ml-2 mt-1" />
          </button>
        </Link>
      </div>
    </div>
  </div>
  );
};

export default HotelDetails;
