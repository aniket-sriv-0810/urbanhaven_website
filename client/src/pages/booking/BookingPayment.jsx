import React from "react";
import { useUser } from "../../components/userContext/userContext";
import { useParams } from "react-router-dom";
import axios from "axios";
const BookingPayment = ({ setBookingData,  hotelData ,bookingData,  handlePrevious }) => {
  const {id} = useParams();
  const {user} = useUser();
  const handlePayment = async() => {
    console.log("Payment successful!");
    const dataSent ={
      userDetails : user._id,
      hotelDetails : hotelData._id,
      ...bookingData,
    }
    console.log("Data sent = " , dataSent);

   try {
     const response = await axios.post(`http://localhost:8000/api/v1/hotel/${id}/booking` ,
       dataSent,
      { withCredentials: true}
     )
     if(response.status == 200){
       console.log("Data sent Successfully");
       
     }
   } catch (error) {
    console.error("Failed to send data", error);
    
   }
  }
  return (
    <div>
      <h2>Payment</h2>
      <p>Total: {bookingData.totalAmount}</p>
      <select
      value={bookingData.paymentDetails || "Default"} // Ensure a default value
      required
      onChange={(e) =>
        setBookingData((prevData) => ({
          ...prevData,
          paymentDetails: e.target.value, // Update the paymentDetails field
        }))
      }
    >
      <option value="no-value">Select Payment Method</option>
      <option value="card">Card</option>
      <option value="upi">UPI</option>
    </select>
    
      <button onClick={handlePrevious}>Back</button>
      <button onClick={handlePayment}>Pay</button>
    </div>
  );
};

export default BookingPayment;
