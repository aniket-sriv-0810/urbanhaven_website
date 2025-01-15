import React, { useState } from "react";
import BookingForm from "./BookingForm";
import BookingDetails from "./BookingDetails";
import BookingPayment from "./BookingPayment";

const Booking = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hotelData , setHotelData] = useState({});
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
  const [totalCost, setTotalCost] = useState(0);

  const handleNext = () => setCurrentPage((prev) => prev + 1);
  const handlePrevious = () => setCurrentPage((prev) => prev - 1);

  return (
    <div>
      {currentPage === 1 && (
        <BookingForm
          bookingData={bookingData}
          setBookingData={setBookingData}
          handleNext={handleNext}
        />
      )}
      {currentPage === 2 && (
        <BookingDetails
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
          bookingData={bookingData}
          totalCost={totalCost}
          handlePrevious={handlePrevious}
        />
      )}
    </div>
  );
};

export default Booking;
