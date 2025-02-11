import React, { useState } from "react";
import { useUser } from "../../components/userContext/userContext";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BsCreditCardFill } from "react-icons/bs";
import { MdQrCodeScanner, MdPayments } from "react-icons/md";
import { TiArrowBack } from "react-icons/ti";
import { BsCashCoin } from "react-icons/bs";
import { FaCcVisa, FaCcMastercard, FaCcAmazonPay } from "react-icons/fa";
import { SiPaytm, SiGooglepay, SiPhonepe } from "react-icons/si";


const BookingPayment = ({ hotelData, bookingData, handlePrevious }) => {
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
        `http://localhost:8000/v1/hotel/${id}/booking`,
        dataSent,
        { withCredentials: true }
      );
      if (response.status === 200) {
        const bookingId = response.data.data.newBooking._id;
        const emailSent = response.data.data.emailSent; // Check if email was sent
  
        if (emailSent) {
          alert("Booking confirmed! A confirmation email has been sent to your inbox.");
        } else {
          alert("Booking confirmed, but the confirmation email could not be sent.");
        }
  
        navigate(`/booking/${bookingId}`);
      }
    } catch (error) {
      console.error("Failed to send data", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center p-6">
    <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-4xl space-y-6">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 text-center">
        Payment Details
      </h1>

      <div className="text-center mb-4">
        <p className="text-lg font-semibold text-gray-700">
          Total Amount: <span className="text-green-600 font-bold text-2xl">₹{bookingData.totalAmount?.toLocaleString("INR")}</span>
        </p>
      </div>

      <h2 className="text-xl font-bold text-gray-800">Choose Payment Method</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <button
          className={`p-6 flex flex-col items-center justify-center rounded-xl shadow-md transition-all ${
            selectedPaymentMethod === "card" ? "border-2 border-blue-600 bg-blue-50" : "border border-gray-300"
          } hover:shadow-lg`}
          onClick={() => setSelectedPaymentMethod("card")}
        >
          <BsCreditCardFill className="text-yellow-500 text-3xl mb-2" />
          <h3 className="font-semibold text-gray-800">Credit/Debit Card</h3>
          <div className="flex gap-2 mt-2">
            <FaCcVisa className="text-blue-700 text-2xl" />
            <FaCcMastercard className="text-red-600 text-2xl" />
            <FaCcAmazonPay className="text-yellow-500 text-2xl" />
          </div>
        </button>

        <button
          className={`p-6 flex flex-col items-center justify-center rounded-xl shadow-md transition-all ${
            selectedPaymentMethod === "upi" ? "border-2 border-blue-600 bg-blue-50" : "border border-gray-300"
          } hover:shadow-lg`}
          onClick={() => setSelectedPaymentMethod("upi")}
        >
          <MdQrCodeScanner className="text-green-600 text-3xl mb-2" />
          <h3 className="font-semibold text-gray-800">UPI Payments</h3>
          <div className="flex gap-2 mt-2">
            <SiGooglepay className="text-blue-600 text-2xl" />
            <SiPaytm className="text-blue-400 text-2xl" />
            <SiPhonepe className="text-purple-500 text-2xl" />
          </div>
        </button>

        <button
          className={`p-6 flex flex-col items-center justify-center rounded-xl shadow-md transition-all ${
            selectedPaymentMethod === "later" ? "border-2 border-blue-600 bg-blue-50" : "border border-gray-300"
          } hover:shadow-lg`}
          onClick={() => setSelectedPaymentMethod("later")}
        >
          <MdPayments className="text-purple-600 text-3xl mb-2" />
          <h3 className="font-semibold text-gray-800">Pay Later</h3>
          <p className="text-sm text-gray-500 text-center">Pay at the time of hotel check-in.</p>
        </button>
      </div>

      {selectedPaymentMethod === "card" && (
        <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Enter Card Details</h3>
          <form className="space-y-6">
            <input type="text" placeholder="Cardholder Name" className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500" />
            <input type="text" placeholder="1234 5678 9101 1121" maxLength={19} className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500" />
            <div className="flex space-x-4">
              <input type="text" placeholder="MM/YY" maxLength={5} className="w-1/2 px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500" />
              <input type="password" placeholder="•••" maxLength={3} className="w-1/2 px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500" />
            </div>
          </form>
        </div>
      )}

      {selectedPaymentMethod === "upi" && (
        <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Enter UPI ID</h3>
        </div>
      )}

      {selectedPaymentMethod === "later" && (
        <div className="p-5 bg-gray-50 shadow-lg rounded-xl">
          <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Pay at Check-in</h3>
          <p className="text-gray-700 text-center">Secure your booking today and enjoy the convenience of paying at the hotel during check-in.</p>
        </div>
      )}

      <div className="flex justify-between">
        <button onClick={handlePrevious} className="flex items-center px-7 py-3 text-white bg-gray-200 rounded-lg font-medium hover:bg-gray-300 transition-all">
          <TiArrowBack className="w-5 h-5" /> Back
        </button>
        <button onClick={handlePayment} className="flex items-center px-6 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all">
          Confirm Payment <BsCashCoin className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  </div>
  );
};

export default BookingPayment;
