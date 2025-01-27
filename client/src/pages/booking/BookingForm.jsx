import React, { useEffect } from "react";
import { useUser } from "../../components/userContext/userContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInDays } from "date-fns";
import { FaMinus , FaPlus , FaUserAlt } from "react-icons/fa";
import { MdCalendarMonth } from "react-icons/md";
import { FaCircleRight , FaSquarePhone  } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";



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
    <div className="flex flex-col justify-center items-center m-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
      <h1 className="text-2xl font-semibold mb-4">Booked By</h1>
      <div className="w-full sm:w-[80%]">
      <div className="flex justify-center items-center">
        <FaUserAlt   className="relative left-8 top-1 w-5 h-5 text-gray-800"/>
        <input
          type="text"
          name="name"
          className={` ${styling}`}
          value={user.name}
          disabled
          placeholder="Name"
        />
      </div>
      <div className="flex justify-center items-center">
      <FaSquarePhone  className="relative left-8 top-1 w-5 h-5 text-gray-800 "/>
        <input
          type="number"
          name="phone"
          className={`${styling}`}
          value={user.phone}
          disabled
          placeholder="Phone"
        />
        </div>
        <div className="flex justify-center items-center">
        <BiLogoGmail  className="relative left-8 top-1 w-5 h-5 text-gray-800 "/>
        <input
          type="email"
          name="email"
          className={`${styling}`}
          value={user.email}
          disabled
          placeholder="Email"
        />
      </div>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-4">Booking Details</h2>
      <div className="flex flex-col sm:flex-row sm:space-x-5 space-y-4 sm:space-y-0">
  {/* Check-in Date */}
  <div className="relative">
    <DatePicker
      selected={bookingData.checkInDate}
      onChange={(date) => handleDateChange(date, "checkInDate")}
      dateFormat="dd-MM-yyyy"
      minDate={new Date()}
      placeholderText="Select Check-in Date"
      className={`${styling} pl-10`} // Add padding for the icon
      required
    />
    <MdCalendarMonth className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl" />
  </div>

  {/* Check-out Date */}
  <div className="relative">
    <DatePicker
      selected={bookingData.checkOutDate}
      onChange={(date) => handleDateChange(date, "checkOutDate")}
      dateFormat="dd-MM-yyyy"
      minDate={bookingData.checkInDate || new Date()}
      placeholderText="Select Check-out Date"
      className={`${styling} pl-10`} // Add padding for the icon
      required
    />
    <MdCalendarMonth  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl" />
  </div>
</div>
   {/* Duration Display */}
   {bookingData.checkOutDate && bookingData.checkInDate && calculateStayDuration() > 0 && (
        <span className="mt-5  text-center font-semibold text-green-500 rounded-xl">
        You’ve selected a stay of {calculateStayDuration()} wonderful {calculateStayDuration() > 1 ?"days" : "day" }

        </span>
      )}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        <div className="flex flex-col items-center ">
          <p className="font-semibold mb-2">Rooms</p>
          <div className="flex items-center gap-4">
            <button
              className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-red-500"
              onClick={() => handleDecrement("room")}
            >
              <FaMinus/>
            </button>
            <span className="text-lg font-medium">{bookingData.room}</span>
            <button
              className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-green-500"
              onClick={() => handleIncrement("room")}
            >
             <FaPlus/>
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-semibold mb-2">Adults</p>
          <div className="flex items-center gap-4">
            <button
              className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-red-500"
              onClick={() => handleDecrement("adultCount")}
            >
               <FaMinus/>
            </button>
            <span className="text-lg font-medium">{bookingData.adultCount}</span>
            <button
              className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-green-500"
              onClick={() => handleIncrement("adultCount")}
            >
              <FaPlus/>
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-semibold mb-2">Infants</p>
          <div className="flex items-center gap-4">
            <button
              className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-red-500"
              onClick={() => handleDecrement("infantCount")}
            >
               <FaMinus/>
            </button>
            <span className="text-lg font-medium">{bookingData.infantCount}</span>
            <button
              className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-green-500"
              onClick={() => handleIncrement("infantCount")}
            >
              <FaPlus/>
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={handleNext}
        className="flex justify-center items-center gap-x-3 w-full sm:w-[40%] mt-6 px-7 py-3 bg-purple-600 rounded-full font-semibold hover:bg-purple-700"
      >
        Next
        <FaCircleRight />
        </button>

    </div>
  );
};

export default BookingForm;
