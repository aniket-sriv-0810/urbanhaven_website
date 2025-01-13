import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../components/userContext/userContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInDays } from "date-fns";

const Booking = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { id } = useParams();

  const [bookingData, setBookingData] = useState({
    checkInDate: null,
    checkOutDate: null,
    room: 1,
    adultCount: 1,
    infantCount: 0,
    paymentDetails: "",
    status: ""
  });

  const handleDateChange = (date, fieldName) => {
    setBookingData({ ...bookingData, [fieldName]: date });
  };

  const handleIncrement = (field) => {
    setBookingData((prevData) => ({
      ...prevData,
      [field]: prevData[field] + 1,
    }));
  };

  const handleDecrement = (field) => {
    setBookingData((prevData) => ({
      ...prevData,
      [field]: Math.max(0, prevData[field] - 1), // Prevent negative values
    }));
  };

  const calculateStayDuration = () => {
    if (bookingData.checkInDate && bookingData.checkOutDate) {
      return differenceInDays(bookingData.checkOutDate, bookingData.checkInDate);
    }
    return 0;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const stayDuration = calculateStayDuration();

    if (stayDuration <= 0) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    const dataSent = {
      user: user._id,
      checkInDate: bookingData.checkInDate,
      checkOutDate: bookingData.checkOutDate,
      room: bookingData.room,
      adultCount: bookingData.adultCount,
      infantCount: bookingData.infantCount,
      paymentDetails: bookingData.paymentDetails,
      status: bookingData.status
    };

    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/hotel/${id}/booking`,
        dataSent,
        { withCredentials: true }
      );

      if (response.status === 200) {
        const bookingId = response.data.data.newBooking._id;
        navigate(`/booking/${bookingId}`);
      } else {
        console.error("Unable to book hotel!");
      }
    } catch (error) {
      console.error("Failed to book hotel room", error);
    }
  };

  return (
    <div className="bg-[url('/assets/booking-bg.jpg')] bg-cover flex flex-col justify-center items-center bg-purple-200 min-h-screen px-4 md:px-8">
      <h1 className="text-white text-3xl font-semibold text-center mb-5 mt-2">
        Confirm Your Booking
      </h1>
      <div className="flex flex-col border-2 border-white rounded-xl p-7 mb-3 bg-[#212125] max-w-md md:w-[60%]">
        <h2 className="text-white text-center font-bold text-xl mb-5 break-all">
          Enter Your Details
        </h2>
        <form className="flex flex-col gap-y-4 lg:p-5" onSubmit={submitForm}>
          <input
            type="text"
            value={user.name}
            name="name"
            readOnly
            className="bg-gray-200"
          />
          <input
            type="number"
            value={user.phone}
            name="number"
            readOnly
            className="bg-gray-200"
          />
          <input
            type="email"
            value={user.email}
            name="email"
            readOnly
            className="bg-gray-200"
          />
          <DatePicker
            selected={bookingData.checkInDate}
            onChange={(date) => handleDateChange(date, "checkInDate")}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            placeholderText="Select Check-in Date"
            className="border rounded-md p-2"
          />
          <DatePicker
            selected={bookingData.checkOutDate}
            onChange={(date) => handleDateChange(date, "checkOutDate")}
            dateFormat="yyyy-MM-dd"
            minDate={bookingData.checkInDate || new Date()}
            placeholderText="Select Check-out Date"
            className="border rounded-md p-2"
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleDecrement("room")}
              className="bg-red-500 text-white px-2 rounded"
            >
              -
            </button>
            <span className="text-white">Rooms: {bookingData.room}</span>
            <button
              type="button"
              onClick={() => handleIncrement("room")}
              className="bg-green-500 text-white px-2 rounded"
            >
              +
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleDecrement("adultCount")}
              className="bg-red-500 text-white px-2 rounded"
            >
              -
            </button>
            <span className="text-white">Adults: {bookingData.adultCount}</span>
            <button
              type="button"
              onClick={() => handleIncrement("adultCount")}
              className="bg-green-500 text-white px-2 rounded"
            >
              +
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleDecrement("infantCount")}
              className="bg-red-500 text-white px-2 rounded"
            >
              -
            </button>
            <span className="text-white">Infants: {bookingData.infantCount}</span>
            <button
              type="button"
              onClick={() => handleIncrement("infantCount")}
              className="bg-green-500 text-white px-2 rounded"
            >
              +
            </button>
          </div>
          <input
            onChange={(e) => setBookingData({ ...bookingData, paymentDetails: e.target.value })}
            type="text"
            value={bookingData.paymentDetails}
            name="paymentDetails"
            placeholder="Payment Details"
            required
          />
          <input
            onChange={(e) => setBookingData({ ...bookingData, status: e.target.value })}
            type="text"
            value={bookingData.status}
            name="status"
            placeholder="Status"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
