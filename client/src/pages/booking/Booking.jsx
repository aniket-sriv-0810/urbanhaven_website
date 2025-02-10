import React, { useState , useEffect } from "react";
import BookingForm from "./BookingForm";
import BookingDetails from "./BookingDetails";
import BookingPayment from "./BookingPayment";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

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
useEffect(() => {
    AOS.init({
       // Start animation after scrolling 100px
      duration: 1500, // Animation duration
      easing: "ease-in-out", // Smooth effect
      mirror:true,
      once: false, // Animation repeats on scroll
    });
  }, []);
  const handleNext = () => setCurrentPage((prev) => prev + 1);
  const handlePrevious = () => setCurrentPage((prev) => prev - 1);

  const styling =
    "text-black text-center text-sm text-gray-800 border border-gray-300 w-full rounded-xl p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 placeholder:text-gray-400 valid:border-green-400 valid:border-2 border-green-500";

  return (
    <div className="bg-gradient-to-r from-fuchsia-600 to-purple-600 flex flex-col justify-center items-center min-h-screen px-4  md:px-8" >
      <h1 className="my-7 text-white text-3xl font-bold text-center ">
        Confirm Your Booking
      </h1>

      <div className="w-full  max-w-4xl bg-gray-100 shadow-lg rounded-lg p-6 mb-16 sm:p-8 md:w-3/4" data-aos="fade-up">
        <div className="flex justify-center items-center mb-6">
          <div
            className={`w-1/3 h-2 rounded-full ${
              currentPage >= 1 ? "bg-green-600  p-1.5 mr-2" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`w-1/3 h-2 rounded-full ${
              currentPage >= 2 ? "bg-green-600 p-1.5 mr-2 " : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`w-1/3 h-2 rounded-full ${
              currentPage === 3 ? "bg-purple-600 p-1.5 " : "bg-gray-300"
            }`}
          ></div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-purple-800">
            {currentPage === 1
              ? "Booking Form"
              : currentPage === 2
              ? "Booking Details"
              : "Payment"}
          </h2>
          <p className="text-gray-600 text-sm mt-2 font-medium">
            {currentPage === 1
              ? "Fill in your details to start the booking process."
              : currentPage === 2
              ? "Review your booking details before proceeding."
              : "Complete your payment to confirm your booking."}
          </p>
        </div>

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
