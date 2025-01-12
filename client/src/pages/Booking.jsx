import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../components/userContext/userContext';
const Booking = () => {
  const {user} = useUser();
  const navigate = useNavigate();
 const [bookingData , setBookingData] = useState({
    checkInDate:"",
    checkOutDate:"",
    room:"",
    adultCount:"",
    infantCount:0,
    paymentDetails:"",
    status:""
 })
const {id} = useParams();

const inputChange = (e) => {
  const {name , value} = e.target;
  setBookingData({...bookingData , [name] :  value});
}

const submitForm = async(e) => {
  e.preventDefault();
  console.log(bookingData);
  console.log("user =>" , user);
  console.log("user id  => " , user._id);
  
  const dataSent = {
    user: user._id,
    checkInDate: bookingData.checkInDate,
    checkOutDate: bookingData.checkOutDate,
    room : bookingData.room,
    adultCount : bookingData.adultCount,
    infantCount : bookingData.infantCount,
    paymentDetails : bookingData.paymentDetails,
    status : bookingData.status
  }
  console.log(dataSent);
  

  try {
    const response = await axios.post(`http://localhost:8000/api/v1/hotel/${id}/booking` , 
      dataSent,
      {withCredentials: true}
    );
      console.log(response);
      const booking = response.data.data.newBooking;
      console.log(booking);
      if(response.status == 200){
        setBookingData({
    checkInDate:"",
    checkOutDate:"",
    room:"",
    adultCount:"",
    infantCount:"",
    paymentDetails:"",
    status:""
        })
      }
    
      else{
        console.error("Unable to book hotel !");
      }
      const bookingId = response.data.data.newBooking._id;

      // Redirect to confirmation page
      navigate(`/booking/${bookingId}`);
  } catch (error) {
    console.error("Failed to book hotel room ", error);
  }
}
  return (
    <>
    <div className="bg-[url('/assets/booking-bg.jpg')] bg-cover flex flex-col justify-center items-center bg-purple-200 min-h-screen px-4 md:px-8">
    <h1 className="text-white text-3xl font-semibold text-center mb-5 mt-2">Confirm Your Booking</h1>
    <div className="flex flex-col border-2 border-white rounded-xl p-7 mb-3 bg-[#212125]  max-w-md md:w-[60%] ">
    <h2 className="text-white text-center font-bold text-xl mb-5 break-all">Enter Your Details</h2>
    <form className="flex flex-col gap-y-4 lg:p-5" onSubmit={submitForm}>
    <input onChange={inputChange} type="text" value={user.name} name="name" required />
    <input onChange={inputChange} type="number" value={user.phone} name="number" required />
    <input onChange={inputChange} type="email" value={user.email} name="email" required />
    <input onChange={inputChange} type="date" value={bookingData.checkInDate} name="checkInDate" required />
    <input onChange={inputChange} type="date" value={bookingData.checkOutDate} name="checkOutDate" required />
    <input onChange={inputChange} type="number" value={bookingData.room} name="room" required />
    <input onChange={inputChange} type="number" value={bookingData.adultCount} name="adultCount" required />
    <input onChange={inputChange} type="number" value={bookingData.infantCount || 0} name="infantCount" required  />
    <input onChange={inputChange} type="text" value={bookingData.paymentDetails} name="paymentDetails" required />
    <input onChange={inputChange} type="text" value={bookingData.status} name="status" required />
    <button type='submit'>Book Now</button>
    </form>
    </div>
    </div>
    </>
  )
}

export default Booking
