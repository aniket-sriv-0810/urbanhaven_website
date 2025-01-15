import React from "react";

const BookingPayment = ({ setBookingData, bookingData, totalCost, handlePrevious }) => {
  const handlePayment = () => {
    console.log("Payment successful!");
  };

  return (
    <div>
      <h2>Payment</h2>
      <p>Total: {totalCost}</p>
      <select
        value={bookingData.paymentMethod}
        onChange={(e) =>
          setBookingData({ ...bookingData, paymentMethod: e.target.value })
        }
      >
        <option value="">Select Payment Method</option>
        <option value="card">Card</option>
        <option value="upi">UPI</option>
      </select>
      <button onClick={handlePrevious}>Back</button>
      <button onClick={handlePayment}>Pay</button>
    </div>
  );
};

export default BookingPayment;
