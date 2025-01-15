import React ,{useEffect, useState}from 'react'
import {useUser} from '../../components/userContext/userContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInDays } from "date-fns";

const BookingForm = ({ bookingData, setBookingData, handleNext }) => {
  const {user} = useUser();

  const handleDateChange = (date, fieldName) => {
    setBookingData({ ...bookingData, [fieldName]: date });
  };
  const calculateStayDuration = () => {
    if (bookingData.checkInDate && bookingData.checkOutDate) {
      return differenceInDays(bookingData.checkOutDate, bookingData.checkInDate);
    }
    return 0;
  };

  useEffect(() =>{
    const duration = calculateStayDuration();
    console.log("Stay Duration: " + duration);
  } ,[])
  return (
    <div className='flex flex-col text-white justify-center items-center bg-pink-700'>
    <h1>User Details</h1>
    <ul>
    <li>{user.name}</li>
    <li>{user._id}</li>
    <li>{user.phone}</li>
    <li>{user.email}</li>
    </ul>

      <h2>Booking Form</h2>
      <DatePicker
                    selected={bookingData.checkInDate}
                    onChange={(date) => handleDateChange(date, "checkInDate")}
                    dateFormat="dd-MM-yyyy"
                    minDate={new Date()}
                    placeholderText="Select Check-in Date"
                    className="border rounded-md p-2 text-black"
                  />
                  <DatePicker
                    selected={bookingData.checkOutDate}
                    onChange={(date) => handleDateChange(date, "checkOutDate")}
                    dateFormat="dd-MM-yyyy"
                    minDate={bookingData.checkInDate || new Date()}
                    placeholderText="Select Check-out Date"
                    className="border rounded-md p-2 text-black"
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
