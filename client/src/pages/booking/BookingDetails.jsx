import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { differenceInDays } from "date-fns";

const BookingDetails = ({
  bookingData,
  setBookingData,
  hotelData,
  setHotelData,
  handleNext,
  handlePrevious,
  value,
  styling,
}) => {
  const { id } = useParams();

  const fetchHotelDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/hotel/${id}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setHotelData(response.data.data.showHotel);
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  const calculateStayDuration = () => {
    if (bookingData.checkInDate && bookingData.checkOutDate) {
      return differenceInDays(bookingData.checkOutDate, bookingData.checkInDate);
    }
    return 0;
  };

  const calculateTotal = () => {
    const duration = calculateStayDuration();
    if (duration > 0) {
      const total = duration * hotelData.price + hotelData.price * 0.18; // Includes 18% tax
      setBookingData((prevData) => ({
        ...prevData,
        totalAmount: total,
      }));
    } else {
      alert("Check-out date must be after check-in date.");
    }
  };

  useEffect(() => {
    fetchHotelDetails();
  }, []);

  useEffect(() => {
    if (hotelData) {
      calculateTotal();
    }
  }, [hotelData, bookingData.checkInDate, bookingData.checkOutDate]);

  return (
    <div className="flex flex-col items-center bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Hotel Details</h1>
      <div className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 mb-4">
        <div>
          <label className="block text-gray-400 text-sm mb-1">Hotel Name</label>
          <input
            type="text"
            name="title"
            className={`${styling}`}
            value={hotelData.title}
            disabled
          />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-1">City</label>
          <input
            type="text"
            name="city"
            className={`${styling}`}
            value={hotelData.city}
            disabled
          />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-1">Price per Night</label>
          <input
            type="text"
            name="price"
            className={`${styling}`}
            value={(hotelData.price)}
            disabled
          />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-1">Rooms</label>
          <p className={`${styling} text-center`}>{bookingData.room}</p>
        </div>
      </div>

      <div className="w-full text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">Confirm Booking</h2>
        <p className="text-lg">
          <span className="font-semibold">Total Cost:</span> ₹
          {bookingData.totalAmount?.toLocaleString("INR") || "Calculating..."}
        </p>
      </div>

      <div className="flex justify-between w-full">
        <button
          onClick={handlePrevious}
          className="px-6 py-3 bg-gray-600 rounded-lg font-semibold hover:bg-gray-700 transition-all"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition-all"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default BookingDetails;
