import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { differenceInDays } from 'date-fns';
const BookingCalender = ({ handleBooking }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [checkInMessage, setCheckInMessage] = useState('Select your check-in date');
  const [checkOutMessage, setCheckOutMessage] = useState('Select your check-out date');
  const price = 1500;
  // Function to calculate the number of nights
  const calculateNights = () => {
    if (checkInDate && checkOutDate) {
      return differenceInDays(checkOutDate, checkInDate); // Calculate difference in days
    }
    return 0;
  };

  const handleSubmit = () => {
    if (checkInDate && checkOutDate) {
      const nights = calculateNights();
      handleBooking(checkInDate, checkOutDate, nights); // Pass nights along with dates
    } else {
      alert('Please select both check-in and check-out dates.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Book Your Stay</h2>
      <div className="mt-4">
        <label className="block">Check-In Date:</label>
        <DatePicker
          selected={checkInDate}
          onChange={(date) => {
            setCheckInDate(date);
            setCheckInMessage(date ? '' : 'Select your check-in date');
          }}
          placeholderText={checkInMessage}
          selectsStart
          startDate={checkInDate}
          endDate={checkOutDate}
          minDate={new Date()}
          className="border p-2"
        />
      </div>
      <div className="mt-4">
        <label className="block">Check-Out Date:</label>
        <DatePicker
          selected={checkOutDate}
          onChange={(date) => {
            setCheckOutDate(date);
            setCheckOutMessage(date ? '' : 'Select your check-out date');
          }}
          placeholderText={checkOutMessage}
          selectsEnd
          startDate={checkInDate}
          endDate={checkOutDate}
          minDate={checkInDate || new Date()}
          className="border p-2"
        />
      </div>
      <div className="mt-4">
        {checkInDate && checkOutDate && (
          <p className="text-green-600">
            You have selected <strong>{calculateNights()}</strong> night(s).
            <br/>
            Your Total = Rs {price*calculateNights()};
          </p>
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-6 bg-blue-500 text-white p-2 rounded"
      >
        Search Hotels
      </button>
    </div>
  );
};


export default BookingCalender;
