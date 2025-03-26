import React, { useState } from "react";
import { useUser } from "../../components/userContext/userContext";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BsCreditCardFill } from "react-icons/bs";
import { MdQrCodeScanner, MdPayments } from "react-icons/md";
import { TiArrowBack } from "react-icons/ti";
import { FaCcVisa, FaCcMastercard, FaCcAmazonPay } from "react-icons/fa";
import { SiPaytm, SiGooglepay, SiPhonepe } from "react-icons/si";
import { MdOutlinePayments } from "react-icons/md";  // Payment icon
import { FaCalendarCheck, FaCreditCard , FaAddressCard , FaShieldAlt } from "react-icons/fa";  
import { LuCalendarCheck } from "react-icons/lu";
import { RiSecurePaymentFill } from "react-icons/ri";
import QRCode from '../../assets/qr.jpg';
import BookingLoader from "../loaders/BookingLoader";
const BookingPayment = ({ hotelData, bookingData, handlePrevious }) => {
  const { id } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [bookingId, setBookingId] = useState(null); // Store booking ID

  const handlePayment = async () => {
    const dataSent = {
      userDetails: user._id,
      hotelDetails: hotelData._id,
      ...bookingData,
      paymentDetails : selectedPaymentMethod
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/hotels/v1/hotel/${id}/booking`,
        dataSent,
        { withCredentials: true }
      );
      if (response.status === 200) {
        const newBookingId = response.data.data.newBooking._id;
        setBookingId(newBookingId); // Store booking ID
        // navigate(`/booking/done`);
      }
    } catch (error) {
     
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-white/20 backdrop-blur-lg">
    {/* Background Overlay */}
    <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>
    
    {/* Payment Container */}
    <div className="relative w-full max-w-4xl bg-black/60  shadow-xl rounded-xl p-8 sm:p-10 border border-white/30 space-y-8">
      <h1 className="text-xl font-bold text-white text-center drop-shadow-md">
        Payment Details
      </h1>

      {/* Amount Section */}
      <div className="text-center text-white text-lg font-semibold">
        Total Amount <span className="text-green-400 ml-3 text-3xl font-bold">₹{bookingData.totalAmount?.toLocaleString("INR")}</span>
      </div>

      {/* Payment Methods */}
      <h2 className="text-sm font-bold text-white text-center">Choose Payment Method</h2>
      <div className="grid grid-cols-1 gap-6" >
        {/* Card Payment */}
        <button
          className={`p-6 flex flex-col  sm:flex-row sm:justify-evenly items-center justify-center rounded-xl shadow-lg transition-all ${selectedPaymentMethod === "card" ? "border-2 border-green-400 bg-white/10" : "border border-white/30"} hover:scale-105`}
          onClick={() => setSelectedPaymentMethod("card")}
        >
        <span className="flex gap-3">
          <BsCreditCardFill className="text-yellow-300 text-xl  mb-2" />
          <h3 className="font-semibold text-xs sm:text-base text-white">Credit/Debit Card</h3>
        </span>
          <div className="flex  gap-3 mt-2 sm:mt-0">
            <FaCcVisa className="text-blue-400 text-3xl" />
            <FaCcMastercard className="text-red-500 text-3xl" />
            <FaCcAmazonPay className="text-yellow-400 text-3xl" />
          </div>
        </button>
 {/* Conditional Payment Details */}
 {selectedPaymentMethod === "card" && (
        <div className="bg-white/10 shadow-lg rounded-2xl p-6 w-full mx-auto">
          <h3 className="text-sm md:text-lg font-bold text-white mb-4 text-center">Enter Card Details</h3>
          <form className="space-y-4 ">
          <span className="flex items-center justify-center">
            <FaAddressCard  className=" hidden xs:block relative left-10 text-white text-2xl " />
            <input type="text" placeholder="Cardholder Name" className="w-full p-2 border rounded-xl bg-white/20 text-white text-center placeholder:text-xs placeholder-gray-300  md:p-3"  />
          </span>
          <span className="flex items-center justify-center">
          <FaCreditCard  className=" hidden xs:block relative left-10 text-white text-2xl " />
            <input type="text" placeholder="1234 5678 9101 1121" maxLength={19} className="w-full p-2 border rounded-xl bg-white/20 text-center text-white placeholder:text-xs placeholder-gray-300  md:p-3" />
          </span>
          
            <div className="flex justify-evenly flex-col gap-3 xs:flex-row">
            <span className="flex items-center justify-center">
          <LuCalendarCheck   className=" hidden xs:block relative left-10 text-white text-2xl " />
              <input type="text" placeholder="MM/YY" maxLength={5} className="w-full p-2 border text-center rounded-xl bg-white/20 text-white placeholder:text-xs placeholder-gray-300  md:p-3" />
          </span>
          <span className="flex items-center justify-center">
          <RiSecurePaymentFill   className=" hidden xs:block relative left-10 text-white text-2xl " />
              <input type="password" placeholder="CVV" maxLength={3} className="w-full p-2 text-center border rounded-xl bg-white/20 text-white placeholder:text-xs placeholder-gray-300  md:p-3" />
          </span>
            </div>
          </form>
        </div>
      )}

        {/* UPI Payment */}

        <button
          className={`p-6 flex flex-col items-center justify-center sm:flex-row sm:justify-evenly rounded-xl shadow-lg transition-all ${selectedPaymentMethod === "upi" ? "border-2 border-green-400 bg-white/10" : "border border-white/30"} hover:scale-105`}
          onClick={() => setSelectedPaymentMethod("upi")}
        >
        <span className="flex gap-3">
          <MdQrCodeScanner className="text-cyan-500 text-2xl mb-2" />
          <h3 className="font-semibold text-white">UPI Payments</h3>
        </span>
          <div className="flex gap-4 mt-2 sm:mt-0 sm:ml-2">
            <SiGooglepay className="text-green-500  text-3xl" />
            <SiPaytm className="text-blue-400 text-3xl" />
            <SiPhonepe className="text-purple-500 text-3xl" />
          </div>
        </button>
        {selectedPaymentMethod === "upi" && (
  <div className="p-6 bg-white/20 backdrop-blur-md shadow-xl rounded-2xl border border-white/30">
    <h3 className="text-xl font-bold text-white text-center mb-4">UPI Payment</h3>

    {/* QR Code Option */}
    <div className="flex flex-col items-center space-y-4">
      <div className="bg-white p-4 rounded-xl shadow-md">
        <img src={QRCode} alt="Scan to Pay" className="w-32 h-32 sm:w-44 sm:h-44 object-cover" />
      </div>
      <p className="text-gray-200 text-xs text-center">Scan the QR code above to pay using any UPI app.</p>
    </div>
  </div>
)}

        {/* Pay Later */}
        <button
          className={`p-6 flex flex-col items-center justify-center sm:flex-row sm:justify-evenly  rounded-xl shadow-lg transition-all ${selectedPaymentMethod === "later" ? "border-2 border-green-400 bg-white/10" : "border border-white/30"} hover:scale-105`}
          onClick={() => setSelectedPaymentMethod("later")}
        >
        <span className="flex items-center gap-3">
          <MdPayments className="text-green-300 text-2xl " />
          <h3 className="font-semibold text-xs  sm:text-sm text-white">Book Now & Pay Later</h3>
        </span>
          <p className="text-xs mt-3 text-gray-300 text-center">Pay at the time of hotel check-in.</p>
        </button>
      </div>

     

      {selectedPaymentMethod === "later" && (
  <div className="p-6 bg-white/20 backdrop-blur-md shadow-xl rounded-2xl border border-white/30">
    {/* Header with Icon */}
    <div className="flex flex-col items-center">
      <MdOutlinePayments className="text-green-500 text-4xl mb-2" />
      <h3 className="text-lg font-bold text-white text-center">Pay at Check-in</h3>
    </div>

    {/* Description */}
    <p className="text-gray-200 text-sm md:text-base text-center w-full mt-3">
      No upfront payment required! Secure your booking today and enjoy a hassle-free check-in.
    </p>

    {/* Benefits Section */}
    <div className="mt-4 flex flex-col items-center space-y-3">
      <div className="flex items-center flex-row space-x-2 gap-3">
        <FaCalendarCheck className="text-green-400 text-sm" />
        <p className="text-gray-200 text-sm">Guaranteed Reservation</p>
      </div>
      <div className="flex items-center flex-row space-x-2 gap-3">
        <FaShieldAlt className="text-yellow-400 text-sm" />
        <p className="text-gray-200 text-sm">Safe & Secure Booking</p>
      </div>
    </div>
  </div>
)}
 {/* Actions */}
      <div className="flex  flex-col-reverse xs:flex-row gap-4 justify-between">
        <button
          onClick={handlePrevious}
          className="flex justify-center items-center gap-x-2 px-7 py-3 text-white bg-gray-500 rounded-lg font-medium hover:bg-gray-700 transition-all"
        >
          <TiArrowBack className="w-5 h-5" />
          Back
        </button>
        <div>
      {bookingId ? (
        <BookingLoader bookingId={bookingId} />
      ) : (

        <button
          onClick={handlePayment}
          className="w-full flex text-xs justify-center items-center gap-x-3 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:scale-105 transition-all"
        >
          Confirm Booking
          <MdOutlinePayments className="w-5 h-5" />
        </button>
      )}
      </div>
      </div>
    </div>
  </div>
  );
};

export default BookingPayment;
