import React, { useEffect } from "react";
import { useUser } from "../../components/userContext/userContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInDays } from "date-fns";

const BookingForm = ({ bookingData, setBookingData, handleNext, value, styling }) => {
  const { user } = useUser();

  const handleDateChange = (date, fieldName) => {
    setBookingData({ ...bookingData, [fieldName]: date });
  };

  const calculateStayDuration = () => {
    if (bookingData.checkInDate && bookingData.checkOutDate) {
      return differenceInDays(bookingData.checkOutDate, bookingData.checkInDate);
    }
    return 0;
  };

  useEffect(() => {
    const duration = calculateStayDuration();
    console.log("Stay Duration: " + duration);
  }, []);

  const handleIncrement = (field) => {
    setBookingData((prev) => ({
      ...prev,
      [field]: prev[field] + 1,
    }));
  };

  const handleDecrement = (field) => {
    setBookingData((prev) => ({
      ...prev,
      [field]: Math.max(1, prev[field] - 1),
    }));
  };

  return (
    <div className="flex flex-col items-center bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      <div className="w-full">
        <input
          type="text"
          name="name"
          className={`${styling}`}
          value={user.name}
          disabled
          placeholder="Name"
        />
        <input
          type="number"
          name="phone"
          className={`${styling}`}
          value={user.phone}
          disabled
          placeholder="Phone"
        />
        <input
          type="email"
          name="email"
          className={`${styling}`}
          value={user.email}
          disabled
          placeholder="Email"
        />
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-4">Booking Details</h2>
      <div className="w-full">
        <DatePicker
          selected={bookingData.checkInDate}
          onChange={(date) => handleDateChange(date, "checkInDate")}
          dateFormat="dd-MM-yyyy"
          minDate={new Date()}
          placeholderText="Select Check-in Date"
          className={`${styling}`}
        />
        <DatePicker
          selected={bookingData.checkOutDate}
          onChange={(date) => handleDateChange(date, "checkOutDate")}
          dateFormat="dd-MM-yyyy"
          minDate={bookingData.checkInDate || new Date()}
          placeholderText="Select Check-out Date"
          className={`${styling}`}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        <div className="flex flex-col items-center">
          <p className="font-semibold">Rooms</p>
          <div className="flex items-center gap-4">
            <button
              className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-700"
              onClick={() => handleDecrement("room")}
            >
              -
            </button>
            <span className="text-lg font-medium">{bookingData.room}</span>
            <button
              className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-700"
              onClick={() => handleIncrement("room")}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-semibold">Adults</p>
          <div className="flex items-center gap-4">
            <button
              className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-700"
              onClick={() => handleDecrement("adultCount")}
            >
              -
            </button>
            <span className="text-lg font-medium">{bookingData.adultCount}</span>
            <button
              className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-700"
              onClick={() => handleIncrement("adultCount")}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-semibold">Infants</p>
          <div className="flex items-center gap-4">
            <button
              className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-700"
              onClick={() => handleDecrement("infantCount")}
            >
              -
            </button>
            <span className="text-lg font-medium">{bookingData.infantCount}</span>
            <button
              className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-700"
              onClick={() => handleIncrement("infantCount")}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={handleNext}
        className="mt-6 px-6 py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700"
      >
        Next
      </button>
    </div>
  );
};

export default BookingForm;
