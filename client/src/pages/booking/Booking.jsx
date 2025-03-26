import React, { useState , useEffect } from "react";
import BookingForm from "./BookingForm";
import BookingDetails from "./BookingDetails";
import BookingPayment from "./BookingPayment";


const Booking = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hotelData, setHotelData] = useState({});
  const [bookingData, setBookingData] = useState({
    checkInDate: null,
    checkOutDate: null,
    room: 1,
    adultCount: 1,
    infantCount: 0,
    totalAmount: 0,
    status: "Pending",
  });

  const handleNext = () => setCurrentPage((prev) => prev + 1);
  const handlePrevious = () => setCurrentPage((prev) => prev - 1);

  const styling =
    "text-black text-center text-sm text-gray-800 border border-gray-300 w-full rounded-xl p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 placeholder:text-gray-400 valid:border-green-400 valid:border-2 border-green-500";

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen px-4 md:px-8 bg-gradient-to-r from-indigo-700 to-purple-900">
      
    {/* Background Overlay with Blur Effect */}
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

    {/* Title */}
    <h1 className="relative my-8 text-white text-2xl xs:text-3xl sm:text-5xl font-extrabold text-center drop-shadow-lg">
      Confirm Your Booking
    </h1>

    {/* Booking Container */}
    <div className="relative w-full max-w-3xl bg-white/20 backdrop-blur-xl shadow-xl rounded-xl p-8 mb-16 sm:p-10 border border-white/30">
      
      {/* Step Indicator */}
      <div className="flex justify-between items-center mb-8">
        <div className={`h-2 flex-1 rounded-full transition-all duration-500 ${currentPage >= 1 ? "bg-green-500 p-1.5" : "bg-gray-300"}`}></div>
        <div className={`h-2 flex-1 rounded-full transition-all duration-500 mx-2 ${currentPage >= 2 ? "bg-green-500 p-1.5" : "bg-gray-300"}`}></div>
        <div className={`h-2 flex-1 rounded-full transition-all duration-500 ${currentPage === 3 ? "bg-purple-600 p-1.5" : "bg-gray-300"}`}></div>
      </div>

      {/* Dynamic Heading & Description */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white drop-shadow-md">
          {currentPage === 1
            ? "Booking Form"
            : currentPage === 2
            ? "Booking Details"
            : "Payment"}
        </h2>
        <p className="text-gray-200 text-sm mt-2 font-medium">
          {currentPage === 1
            ? "Fill in your details to start the booking process."
            : currentPage === 2
            ? "Review your booking details before proceeding."
            : "Complete your payment to confirm your booking."}
        </p>
      </div>

      {/* Conditional Rendering of Booking Steps */}
      {currentPage === 1 && (
        <BookingForm
          styling={styling}
          bookingData={bookingData}
          setBookingData={setBookingData}
          handleNext={handleNext}
        />
      )}
      {currentPage === 2 && (
        <BookingDetails
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
