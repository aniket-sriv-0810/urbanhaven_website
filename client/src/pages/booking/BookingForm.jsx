import React, { useEffect } from "react";
import { useUser } from "../../components/userContext/userContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInDays } from "date-fns";
import { FaMinus, FaPlus, FaUserAlt } from "react-icons/fa";
import { MdCalendarMonth } from "react-icons/md";
import { FaCircleRight, FaSquarePhone } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";
import { toast , ToastContainer , Bounce } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

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
    console.log("Stay Duration: " + calculateStayDuration());
  }, [bookingData.checkInDate, bookingData.checkOutDate]);

  // Validation & Toast Logic
  const handleIncrement = (field) => {
    setBookingData((prev) => {
      if (field === "room" && prev.room >= 4) {
        toast.error('Maximum of 4 rooms to be booked ', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          });
        return prev;
      }
      if (field === "adultCount" && prev.adultCount >= prev.room * 3) {
        toast.error('Maximum of 3 adults are allowed in single room ', {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          });
        return prev;
      }
      if (field === "infantCount" && prev.infantCount >= prev.room * 2) {
        toast.error("Maximum 2 infants per room allowed.");
        return prev;
      }
      return { ...prev, [field]: prev[field] + 1 };
    });
  };

  const handleDecrement = (field) => {
    setBookingData((prev) => ({
      ...prev,
      [field]: Math.max(1, prev[field] - 1),
    }));
  };

  // Handle Form Submission
  const handleFormSubmit = () => {
    if (!bookingData.checkInDate || !bookingData.checkOutDate) {
      toast.error('Select proper Dates ', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
      return;
    }
    handleNext();
  };

  return (
    <div className="flex flex-col justify-center items-center m-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-2xl overflow-hidden">
      <h1 className="text-2xl font-semibold mb-4">Booked By</h1>
      <div className="w-full sm:w-[80%]">
        <div className="flex justify-center items-center">
          <FaUserAlt className="relative left-8 top-1 w-5 h-5 text-gray-800" />
          <input type="text" className={`${styling}`} value={user.name} disabled placeholder="Name" />
        </div>
        <div className="flex justify-center items-center">
          <FaSquarePhone className="relative left-8 top-1 w-5 h-5 text-gray-800 " />
          <input type="number" className={`${styling}`} value={user.phone} disabled placeholder="Phone" />
        </div>
        <div className="flex justify-center items-center">
          <BiLogoGmail className="relative left-8 top-1 w-5 h-5 text-gray-800 " />
          <input type="email" className={`${styling}`} value={user.email} disabled placeholder="Email" />
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
            className={`${styling} pl-10`}
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
            className={`${styling} pl-10`}
            required
          />
          <MdCalendarMonth className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl" />
        </div>
      </div>

      {/* Duration Display */}
      {bookingData.checkOutDate && bookingData.checkInDate && calculateStayDuration() > 0 && (
        <span className="mt-5 text-center font-semibold text-green-500 rounded-xl">
          You’ve selected a stay of {calculateStayDuration()} {calculateStayDuration() > 1 ? "days" : "day"}.
        </span>
      )}

      {/* Counters for Rooms, Adults & Infants */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        {[
          { label: "Rooms", field: "room", max: 4 },
          { label: "Adults", field: "adultCount", max: bookingData.room * 3 },
          { label: "Infants", field: "infantCount", max: bookingData.room * 2 },
        ].map(({ label, field }) => (
          <div key={field} className="flex flex-col items-center">
            <p className="font-semibold mb-2">{label}</p>
            <div className="flex items-center gap-4">
              <button
                className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-red-500"
                onClick={() => handleDecrement(field)}
              >
                <FaMinus />
              </button>
              <span className="text-lg font-medium">{bookingData[field]}</span>
              <button
                className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-green-500"
                onClick={() => handleIncrement(field)}
              >
                <FaPlus />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Next Button with Validation */}
      <button
        onClick={handleFormSubmit}
        className="flex justify-center items-center gap-x-3 w-full sm:w-[40%] mt-6 px-7 py-3 bg-purple-600 rounded-full font-semibold hover:bg-purple-700"
      >
        Next <FaCircleRight />
      </button>
   
    <ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover={false}
theme="light"
transition={Bounce}
/>
</div>
  );
};

export default BookingForm;
