import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../components/userContext/userContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInDays } from "date-fns";
import axios from "axios";

const Booking = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { id } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [bookingData, setBookingData] = useState({
    checkInDate: null,
    checkOutDate: null,
    room: 1,
    adultCount: 1,
    infantCount: 0,
    paymentDetails: "",
  });
  const [hotelDetails, setHotelDetails] = useState({});
  const [totalCost, setTotalCost] = useState(0);

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
      [field]: Math.max(0, prevData[field] - 1),
    }));
  };

  const calculateStayDuration = () => {
    if (bookingData.checkInDate && bookingData.checkOutDate) {
      return differenceInDays(bookingData.checkOutDate, bookingData.checkInDate);
    }
    return 0;
  };

  const fetchHotelDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/hotel/${id}`);
      setHotelDetails(response.data.data.hotel);
    } catch (error) {
      console.error("Error fetching hotel details:", error);
    }
  };

  const calculateTotal = () => {
    const duration = calculateStayDuration();
    if (duration > 0) {
      const total = duration * hotelDetails.pricePerNight + hotelDetails.taxes;
      setTotalCost(total);
    } else {
      alert("Check-out date must be after check-in date.");
    }
  };

  const handleNext = () => {
    if (currentPage === 1) {
      calculateTotal();
      fetchHotelDetails();
    }
    setCurrentPage(currentPage + 1);
  };

  const handleBooking = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/hotel/${id}/booking`,
        {
          user: user._id,
          ...bookingData,
          hotelId: id,
          total: totalCost,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("Booking successful!");
        navigate(`/booking/${response.data.data.newBooking._id}`);
      }
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <div className="bg-[url('/assets/booking-bg.jpg')] flex flex-col items-center min-h-screen bg-purple-200 px-4 md:px-8">
          <h1 className="text-white">{id}</h1>
            <h1 className="text-3xl font-semibold text-white text-center mb-5 mt-2">
              Enter Your Details
            </h1>
            <form className="flex flex-col bg-[#212125] border-2 border-white rounded-xl p-7 max-w-md gap-y-4">
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
              {/* Room and Guest Count */}
              <div className="flex flex-col gap-2">
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
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Next
              </button>
            </form>
          </div>
        );
      case 2:
        return (
          <div className="bg-[url('/assets/booking-bg.jpg')] flex flex-col items-center min-h-screen bg-purple-200 px-4 md:px-8">
            <h1 className="text-3xl font-semibold text-white text-center mb-5 mt-2">
              Confirm Your Booking
            </h1>
            <div className="bg-[#212125] border-2 border-white rounded-xl p-7 max-w-md gap-y-4 text-white">
              <p>Hotel: {hotelDetails.name}</p>
              <p>Price per Night: {hotelDetails.pricePerNight}</p>
              <p>Taxes: {hotelDetails.taxes}</p>
              <p>Total Cost: {totalCost}</p>
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-500 text-white p-2 rounded-md mt-4"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="bg-[url('/assets/booking-bg.jpg')] flex flex-col items-center min-h-screen bg-purple-200 px-4 md:px-8">
            <h1 className="text-3xl font-semibold text-white text-center mb-5 mt-2">
              Payment
            </h1>
            <form className="bg-[#212125] border-2 border-white rounded-xl p-7 max-w-md gap-y-4 flex flex-col text-white">
              <select
                value={bookingData.paymentDetails}
                onChange={(e) =>
                  setBookingData({ ...bookingData, paymentDetails: e.target.value })
                }
                className="p-2 rounded-md"
              >
                <option value="">Select Payment Method</option>
                <option value="card">Card</option>
                <option value="upi">UPI</option>
                <option value="pay-at-hotel">Pay at Hotel</option>
              </select>
              <button
                type="button"
                onClick={handleBooking}
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Book Now
              </button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return <div>{renderPage()}</div>;
};

export default Booking;
