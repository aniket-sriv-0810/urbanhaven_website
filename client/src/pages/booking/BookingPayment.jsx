import React, { useState } from "react";
import { useUser } from "../../components/userContext/userContext";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BsCreditCardFill } from "react-icons/bs";
import { MdQrCodeScanner , MdPayments   } from "react-icons/md";
const BookingPayment = ({ setBookingData, hotelData, bookingData, handlePrevious }) => {
  const { id } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");

  const handlePayment = async () => {
    console.log("Payment successful!");
    const dataSent = {
      userDetails: user._id,
      hotelDetails: hotelData._id,
      ...bookingData,
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
      }
    } catch (error) {
      console.error("Failed to send data", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl space-y-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 text-center">Payment Details</h1>

        {/* Total Amount */}
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-600">
            Total Amount: <span className="text-green-600">₹{bookingData.totalAmount?.toLocaleString("INR")}</span>
          </p>
        </div>

        {/* Payment Methods */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Choose Payment Method</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Credit/Debit Card */}
            <button
              className={`p-4 rounded-lg border ${selectedPaymentMethod === "card" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
              onClick={() => setSelectedPaymentMethod("card")}
            >
              <h3 className="font-semibold text-gray-800">Credit/Debit Card</h3>
              <span><BsCreditCardFill className="text-yellow-500"/></span>
              <p className="text-sm text-gray-500">Pay securely using your card details.</p>
            </button>

            {/* UPI Payments */}
            <button
              className={`p-4 rounded-lg border ${selectedPaymentMethod === "upi" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
              onClick={() => setSelectedPaymentMethod("upi")}
            >
              <h3 className="font-semibold text-gray-800">UPI Payments</h3>
              <span><MdQrCodeScanner className="text-black"/></span>
              <p className="text-sm text-gray-500">Pay via GPay, PhonePe, Paytm, etc.</p>
            </button>

            {/* Book Now, Pay Later */}
            <button
              className={`p-4 rounded-lg border ${selectedPaymentMethod === "later" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
              onClick={() => setSelectedPaymentMethod("later")}
            >
              <h3 className="font-semibold text-gray-800">Book Now, Pay Later</h3>
              <span><MdPayments  className="text-green-500"/></span>
              <p className="text-sm text-gray-500">Pay at the time of hotel check-in.</p>
            </button>
          </div>
        </div>

        {/* Payment Form */}
        <div className="space-y-4">
          {selectedPaymentMethod === "card" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Enter Card Details</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="Expiry (MM/YY)"
                    className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </form>
            </div>
          )}

          {selectedPaymentMethod === "upi" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Enter UPI ID</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="e.g., yourname@bank"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </form>
            </div>
          )}

          {selectedPaymentMethod === "later" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Pay Later</h3>
              <p className="text-gray-600">
                Your booking will be confirmed, and you can pay at the time of hotel check-in.
              </p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-all"
          >
            Back
          </button>
          <button
            onClick={handlePayment}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Confirm & Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPayment;
