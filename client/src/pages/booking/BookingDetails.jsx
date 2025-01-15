import React, { useEffect } from "react";

const BookingDetails = ({
  bookingData,
  totalCost,
  setTotalCost,
  handleNext,
  handlePrevious,
}) => {
  useEffect(() => {
    const duration =
      bookingData.checkOutDate &&
      bookingData.checkInDate &&
      Math.max(
        1,
        (bookingData.checkOutDate - bookingData.checkInDate) / (1000 * 60 * 60 * 24)
      );
    const cost = duration * 100; // Replace 100 with actual price logic
    setTotalCost(cost);
  }, [bookingData, setTotalCost]);

  return (
    <div>
      <h2>Confirm Booking</h2>
      <p>Rooms: {bookingData.room}</p>
      <p>Total Cost: {totalCost}</p>
      <button onClick={handlePrevious}>Back</button>
      <button onClick={handleNext}>Confirm</button>
    </div>
  );
};

export default BookingDetails;
