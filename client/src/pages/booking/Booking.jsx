import React, { useState } from "react";

import BookingForm from "./BookingForm";
import BookingDetails from "./BookingDetails";
import BookingPayment from "./BookingPayment";

const Booking = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingData, setBookingData] = useState({
    checkInDate: null,
    checkOutDate: null,
    room: 1,
    adultCount: 1,
    infantCount: 0,
    paymentMethod: "",
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
          totalCost={totalCost}
          setTotalCost={setTotalCost}
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
