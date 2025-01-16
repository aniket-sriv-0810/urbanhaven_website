import React, { useState } from "react";
import BookingForm from "./BookingForm";
import BookingDetails from "./BookingDetails";
import BookingPayment from "./BookingPayment";

const Booking = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hotelData , setHotelData] = useState({});
  let value=null;
  const [bookingData , setBookingData] = useState({
    checkInDate: null,
    checkOutDate: null,
    room:1,
    adultCount:1,
    infantCount:0,
    totalAmount:0,
    paymentDetails:"",
    status:"Pending",
  });

  const handleNext = () => setCurrentPage((prev) => prev + 1);
  const handlePrevious = () => setCurrentPage((prev) => prev - 1);
  
  const styling =
    " border border-gray-300 rounded-xl p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#5454544f] placeholder:text-center placeholder:capitalize placeholder:text-white valid:border-green-400 valid:border-2 text-center";
  return (
    <div className="bg-[url('/assets/booking-bg.jpg')] bg-cover flex flex-col justify-center items-center bg-purple-200 min-h-screen px-4 md:px-8">
    <h1 className="text-white text-2xl font-semibold text-center mb-5 mt-2 sm:text-3xl">
         Confirm Your Booking
        </h1>
        <div className="flex flex-col border-2 border-white rounded-xl p-6 bg-[#212521] max-w-md md:w-[65%]">
        <h2 className="text-white text-center font-bold text-xl mb-5">
        { value && value.length > 0  ? value : null}
      </h2>
      {currentPage === 1 && (
        <BookingForm
        value={value}
        styling={styling}
          bookingData={bookingData}
          setBookingData={setBookingData}
          handleNext={handleNext}
        />
      )}
      {currentPage === 2 && (
        <BookingDetails
        value={value}
        styling={styling}
          bookingData={bookingData}
          setBookingData={setBookingData}
          hotelData={hotelData}
          setHotelData={setHotelData}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />
      )}
      {currentPage === 3 && (
        <BookingPayment
        value={value}
        styling={styling}
          bookingData={bookingData}
          setBookingData={setBookingData}
          hotelData={hotelData}
          handlePrevious={handlePrevious}
        />
      )}
      </div>
    </div>
  );
};

export default Booking;
