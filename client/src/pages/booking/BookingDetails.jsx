import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { differenceInDays } from "date-fns";
import { useUser } from "../../components/userContext/userContext";
import { MdOutlinePayments } from "react-icons/md";
import { TiArrowBack } from "react-icons/ti";
const BookingDetails = ({
  bookingData,
  setBookingData,
  hotelData,
  setHotelData,
  handleNext,
  handlePrevious,
}) => {
  const { id } = useParams();
  const {user} = useUser();
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
    <div className="bg-gray-50 min-h-screen px-4 flex justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full space-y-6">
        {/* Hotel Details */}
        <section className="space-y-4 ">
          <h1 className="text-3xl font-bold text-gray-800">Hotel Details</h1>
          <div className="flex flex-col sm:flex-row sm:space-x-6">
            <img
              src={hotelData.image}
              alt={hotelData.title}
              className="w-full sm:w-1/3 rounded-lg shadow-md object-cover"
            />
            <div className="space-y-2 flex-1">
              <p className="text-lg font-semibold text-gray-700">{hotelData.title}</p>
              <p className="text-gray-500">{hotelData.city}, {hotelData.state}</p>
              <p className="text-gray-500">
                Price per Night: <span className="font-semibold">₹{hotelData.price}</span>
              </p>
            </div>
          </div>
        </section>

        {/* User Booking Details */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Your Booking Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p>
              <span className="font-medium">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {user.phone}
            </p>
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-medium">Rooms:</span> {bookingData.room}
            </p>
            <p>
              <span className="font-medium">Check-in:</span> {bookingData.checkInDate?.toLocaleDateString()}
            </p>
            <p>
              <span className="font-medium">Check-out:</span> {bookingData.checkOutDate?.toLocaleDateString()}
            </p>
          
            <p>
              <span className="font-medium">Adults:</span> {bookingData.adultCount}
            </p>
            <p>
              <span className="font-medium">Infants:</span> {bookingData.infantCount}
            </p>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Pricing Details</h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Total Stay:</span> {calculateStayDuration()} nights
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Price per Night:</span> ₹{hotelData.price}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Taxes (18%):</span> ₹{(hotelData.price * 0.18).toFixed(2)}
            </p>
            <p className="text-xl font-semibold text-gray-800">
              Total Amount: <span className="text-green-600"> ₹{bookingData.totalAmount?.toLocaleString("INR")}</span>
            </p>
          </div>
        </section>

        {/* Actions */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            className="flex  items-center gap-x-2 px-7 py-3 text-white bg-gray-200 rounded-lg font-medium hover:bg-gray-300 transition-all bg-gradient-to-r from-cyan-600 to-blue-800 hover:scale-105 hover:shadow-lg hover:shadow-gray-500"
          >
            <TiArrowBack className="w-5 h-5" />
            Back
          </button>
          <button
            onClick={handleNext}
            className=" flex  items-center gap-x-3 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg font-medium hover:scale-105 hover:bg-gradient-to-r hover:from-emerald-800 hover:to-green-600 transition-all hover:shadow-lg hover:shadow-gray-500"
          >
            Confirm Booking
            <MdOutlinePayments className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
