import React from "react";
import DatePicker from "react-datepicker";

const BookingForm = ({ bookingData, setBookingData, handleNext }) => {
  const handleDateChange = (date, fieldName) => {
    setBookingData({ ...bookingData, [fieldName]: date });
  };

  const handleIncrement = (field) => {
    setBookingData((prev) => ({ ...prev, [field]: prev[field] + 1 }));
  };

  const handleDecrement = (field) => {
    setBookingData((prev) => ({ ...prev, [field]: Math.max(0, prev[field] - 1) }));
  };

  return (
    <div>
      <h2>Booking Form</h2>
      <DatePicker
        selected={bookingData.checkInDate}
        onChange={(date) => handleDateChange(date, "checkInDate")}
        placeholderText="Check-in Date"
      />
      <DatePicker
        selected={bookingData.checkOutDate}
        onChange={(date) => handleDateChange(date, "checkOutDate")}
        placeholderText="Check-out Date"
      />
      <div>
        <button onClick={() => handleDecrement("room")}>-</button>
        <span>Rooms: {bookingData.room}</span>
        <button onClick={() => handleIncrement("room")}>+</button>
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default BookingForm;
