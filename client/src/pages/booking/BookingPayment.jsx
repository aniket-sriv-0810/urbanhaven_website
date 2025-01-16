import React from "react";
import { useUser  } from "../../components/userContext/userContext";
import { useParams , useNavigate } from "react-router-dom";
import axios from "axios";

const BookingPayment = ({
  setBookingData,
  hotelData,
  bookingData,
  handlePrevious,
  value,
  styling,
}) => {
  const { id } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const handlePayment = async () => {
    console.log("Payment successful!");
    const dataSent = {
      userDetails: user._id,
      hotelDetails: hotelData._id,
      ...bookingData,
    };
    console.log("Data sent = ", dataSent);

    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/hotel/${id}/booking`,
        dataSent,
        { withCredentials: true }
      );
      console.log("response : " , response.data.data.newBooking);
      console.log("response : " , response.data.data.newBooking._id);
      
      const bookingId = response.data.data.newBooking._id;
      console.log("Booking Id: " + bookingId);
      if (response.status == 200) {
        console.log("Data sent successfully");
        const bookingId = response.data.data.newBooking._id;
        console.log("Booking Id: " + bookingId);
        navigate(`/booking/${bookingId}`)
        
      }
    } catch (error) {
      console.error("Failed to send data", error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Payment Details</h1>
      <div className="w-full mb-4">
        <p className="text-lg font-semibold text-gray-300">
          Total Amount: <span className="text-green-400">₹{bookingData.totalAmount?.toLocaleString("INR")}</span>
        </p>
      </div>

      <div className="w-full mb-6">
        <label htmlFor="payment-method" className="block text-gray-400 text-sm mb-2">
          Select Payment Method
        </label>
        <select
          id="payment-method"
          value={bookingData.paymentDetails || "no-value"}
          required
          onChange={(e) =>
            setBookingData((prevData) => ({
              ...prevData,
              paymentDetails: e.target.value,
            }))
          }
          className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="no-value" disabled>
            Choose a Payment Method
          </option>
          <option value="card">Card</option>
          <option value="upi">UPI</option>
        </select>
      </div>

      <div className="flex justify-between w-full">
        <button
          onClick={handlePrevious}
          className="px-6 py-3 bg-gray-600 rounded-lg font-semibold hover:bg-gray-700 transition-all"
        >
          Back
        </button>
        <button
          onClick={handlePayment}
          className="px-6 py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition-all"
        >
          Pay
        </button>
      </div>
    </div>
  );
};

export default BookingPayment;
