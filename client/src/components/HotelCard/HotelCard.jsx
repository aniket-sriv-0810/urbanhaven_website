import React from "react";
const HotelCard = ({ hotel }) => {
    return (
      <div className="border rounded-lg shadow-lg p-4">
        <img src={hotel.image} alt={hotel.name} className="w-full h-40 object-cover rounded-md" />
        <h3 className="text-xl font-semibold mt-2">{hotel.name}</h3>
        <p className="text-gray-500">{hotel.city}, {hotel.state}, {hotel.country}</p>
        <p className="text-blue-600 font-bold mt-2">${hotel.price} per night</p>
      </div>
    );
  };
  
  export default HotelCard;
  