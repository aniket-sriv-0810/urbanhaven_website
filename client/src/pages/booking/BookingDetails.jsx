import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { differenceInDays } from "date-fns";
import { useUser } from "../../components/userContext/userContext";
import { MdOutlinePayments } from "react-icons/md";
import { TiArrowBack } from "react-icons/ti";
import { FaUser, FaPhoneAlt, FaEnvelope, FaBed, FaCalendarAlt, FaUserFriends, FaBaby } from "react-icons/fa";
import SkeletonForm from "../../components/LoadingSkeleton/SkeletonForm";


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
  const [loading ,setLoading] = useState(true);
  const fetchHotelDetails = async () => {
    try {
      setLoading(true); // Set loading before making the request
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/v1/hotel/${id}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setHotelData(response.data.data.showHotel);
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false); // Ensure loading is set to false after fetching
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
      const total = duration * hotelData.price + hotelData.price * 0.18 * bookingData.room; // Includes 18% tax
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

  if(loading) return <><SkeletonForm/></>
  return (
    <div className="relative flex justify-center items-center min-h-screen  bg-gradient-to-r from-indigo-800 to-purple-900">
      
    {/* Background Blur Overlay */}
    <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>

    {/* Booking Details Card */}
    <div className="relative w-full max-w-4xl bg-white/20 backdrop-blur-lg shadow-xl  p-8 sm:p-10 border border-white/30 space-y-10">
      
      {/* Hotel Details Section */}
      <section className="space-y-6">
        <h1 className="text-2xl font-bold text-white text-center drop-shadow-md">Hotel Details</h1>
        <div className="flex flex-col sm:flex-row sm:space-x-6">
          <img
            src={hotelData.image}
            alt={hotelData.title}
            className="w-full sm:w-1/3 rounded-lg shadow-md object-cover"
          />
          <div className="space-y-4 m-auto flex-1 text-white">
            <h2 className="text-2xl font-semibold">{hotelData ?  hotelData.title : <div className="mt-4 h-6 w-3/4 bg-gray-300 rounded"></div>}</h2>
            <p className="text-gray-300 text-sm">{ hotelData ? hotelData.city : <div className="mt-4 h-6 w-3/4 bg-gray-300 rounded"></div>}, { hotelData ? hotelData.state : <div className="mt-4 h-6 w-3/4 bg-gray-300 rounded"></div>}</p>
            <p className="text-sm">
              <span className="font-normal">Price per Night:</span> <span className="text-green-300">₹{ hotelData.price ? (hotelData.price).toLocaleString("INR") : null}</span>
            </p>
          </div>
        </div>
      </section>

      {/* User Booking Details */}
      <section className="space-y-6">
        <h2 className="text-base font-bold text-white text-center drop-shadow-md">Your Booking Details</h2>
        <div className=" grid grid-cols-1 xs:grid-cols-2 gap-6 text-white text-xs sm:text-sm lg:text-base">
          <p className="flex items-center  gap-2 "><FaUser className="text-green-400" /> <span className="font-medium">Name:</span> {user.name}</p>
          <p className="flex items-center  gap-2 "><FaPhoneAlt className="text-green-400" /> <span className="font-medium">Phone:</span> {user.phone}</p>
          <p className="flex items-center gap-2 "><FaEnvelope className="text-green-400" /> <span className="font-medium">Email:</span> {user.email}</p>
          <p className="flex items-center gap-2"><FaBed className="text-green-400" /> <span className="font-medium">Rooms:</span> {bookingData.room}</p>
          <p className="flex items-center gap-2"><FaCalendarAlt className="text-green-400" /> <span className="font-medium">Check-in:</span> {bookingData.checkInDate?.toLocaleDateString("en-IN")}</p>
          <p className="flex items-center gap-2"><FaCalendarAlt className="text-green-400" /> <span className="font-medium">Check-out:</span> {bookingData.checkOutDate?.toLocaleDateString("en-IN")}</p>
          <p className="flex items-center gap-2"><FaUserFriends className="text-green-400" /> <span className="font-medium">Adults:</span> {bookingData.adultCount}</p>
          <p className="flex items-center gap-2"><FaBaby className="text-green-400" /> <span className="font-medium">Infants:</span> {bookingData.infantCount}</p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="space-y-6 text-center">
        <h2 className="text-xl font-bold text-white text-center drop-shadow-md">Pricing Details</h2>
        <div className="space-y-5 text-sm text-white">
          <p><span className="font-medium">Total Stay:</span> {calculateStayDuration()} nights</p>
          <p><span className="font-medium">Price per Night:</span> ₹{hotelData.price}</p>
          <p><span className="font-medium">Taxes (18%):</span> ₹{(hotelData.price * 0.18).toFixed(2)}</p>
          <p className=" text-2xl font-bold">
            Total Amount <span className="text-green-400 mx-3"> ₹{bookingData.totalAmount?.toLocaleString("INR")}</span>
          </p>
        </div>
      </section>

      {/* Actions */}
      <div className="flex  flex-col-reverse xs:flex-row gap-4 justify-between">
        <button
          onClick={handlePrevious}
          className="flex justify-center items-center gap-x-2 px-7 py-3 text-white bg-gray-500 rounded-lg font-medium hover:bg-gray-700 transition-all"
        >
          <TiArrowBack className="w-5 h-5" />
          Back
        </button>
        <button
          onClick={handleNext}
          className="flex text-xs justify-center items-center gap-x-3 px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:scale-105 transition-all"
        >
          Proceed to Payment
          <MdOutlinePayments className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
  );
};

export default BookingDetails;
