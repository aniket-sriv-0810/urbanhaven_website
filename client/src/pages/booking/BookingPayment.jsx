import React, { useState } from "react";
import { useUser } from "../../components/userContext/userContext";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BsCreditCardFill } from "react-icons/bs";
import { MdQrCodeScanner, MdPayments } from "react-icons/md";
import { TiArrowBack } from "react-icons/ti";
import { BsCashCoin } from "react-icons/bs";

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
      paymentDetails : selectedPaymentMethod
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
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-4xl space-y-6">
        {/* Header */}
        <h1 className="text-3xl font-bold p-1 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 text-center">
          Payment Details
        </h1>

        {/* Total Amount */}
        <div className="text-center mb-4">
          <p className="text-lg font-semibold text-gray-700">
            Total Amount:{" "}
            <span className="text-green-600 font-bold text-2xl">
              ₹{bookingData.totalAmount?.toLocaleString("INR")}
            </span>
          </p>
        </div>

        {/* Payment Methods */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Choose Payment Method</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Credit/Debit Card */}
            <button
              className={`p-6 flex flex-col items-center justify-center rounded-xl shadow-md transition-all ${
                selectedPaymentMethod === "card"
                  ? "border-2 border-blue-600 bg-blue-50"
                  : "border border-gray-300"
              } hover:shadow-lg`}
              onClick={() => setSelectedPaymentMethod("card")}
            >
              <BsCreditCardFill className="text-yellow-500 text-3xl mb-2" />
              <h3 className="font-semibold text-gray-800">Credit/Debit Card</h3>
              <p className="text-sm text-gray-500 text-center">
                Pay securely using your card details.
              </p>
            </button>

            {/* UPI Payments */}
            <button
              className={`p-6 flex flex-col items-center justify-center rounded-xl shadow-md transition-all ${
                selectedPaymentMethod === "upi"
                  ? "border-2 border-blue-600 bg-blue-50"
                  : "border border-gray-300"
              } hover:shadow-lg`}
              onClick={() => setSelectedPaymentMethod("upi")}
            >
              <MdQrCodeScanner className="text-green-600 text-3xl mb-2" />
              <h3 className="font-semibold text-gray-800">UPI Payments</h3>
              <p className="text-sm text-gray-500 text-center">
                Pay via GPay, PhonePe, Paytm, etc.
              </p>
            </button>

            {/* Pay Later */}
            <button
              className={`p-6 flex flex-col items-center justify-center rounded-xl shadow-md transition-all ${
                selectedPaymentMethod === "later"
                  ? "border-2 border-blue-600 bg-blue-50"
                  : "border border-gray-300"
              } hover:shadow-lg`}
              onClick={() => setSelectedPaymentMethod("later")}
            >
              <MdPayments className="text-purple-600 text-3xl mb-2" />
              <h3 className="font-semibold text-gray-800">Pay Later</h3>
              <p className="text-sm text-gray-500 text-center">
                Pay at the time of hotel check-in.
              </p>
            </button>
          </div>
        </div>

        {/* Payment Form */}
        <div className="space-y-6">
          {selectedPaymentMethod === "card" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Enter Card Details</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="Expiry (MM/YY)"
                    className="w-1/2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-1/2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </form>
            </div>
          )}

          {selectedPaymentMethod === "upi" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Enter UPI ID</h3>
              <form>
                <input
                  type="text"
                  placeholder="e.g., yourname@bank"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </form>
            </div>
          )}

          {selectedPaymentMethod === "later" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Pay Later</h3>
              <p className="text-gray-600">
                Your booking will be confirmed, and you can pay at the time of hotel check-in.
              </p>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
           <button
                      onClick={handlePrevious}
                      className="flex  items-center gap-x-2 px-7 py-3 text-white bg-gray-200 rounded-lg font-medium hover:bg-gray-300 transition-all bg-gradient-to-r from-cyan-600 to-blue-800 hover:scale-105 hover:shadow-lg hover:shadow-gray-500"
                    >
                      <TiArrowBack className="w-5 h-5" />
                      Back
                    </button>
          <button
            onClick={handlePayment}
            className="flex items-center gap-x-2 px-6 py-4 bg-gradient-to-r from-emerald-900 to-green-600 text-white rounded-lg font-semibold hover:bg-gradient-to-r hover:from-green-600 hover:to-green-900 hover:scale-105 hover:shadow-md hover:shadow-gray-600 transition-all"
          >
            Confirm your payment
             <BsCashCoin className="w-5 h-5 mt-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPayment;
