import React, { useEffect } from "react";
import {useParams} from 'react-router-dom';
import axios from "axios";
import { differenceInDays } from "date-fns";
const BookingDetails = ({
  bookingData,
  setBookingData,
  hotelData,
  setHotelData,
  handleNext,
  handlePrevious,
  value,
  styling
}) => {
const {id} = useParams();

      const fetchHotelDetails = async() => {
        try {
          const response = await axios.get(`http://localhost:8000/api/v1/hotel/${id}` ,{
            withCredentials:true,
          });
          if(response.status == 200){
            console.log("hotel Data = ", response.data.data.showHotel);
            setHotelData(response.data.data.showHotel);
          }
        } catch (error) {
          console.error("Failed to fetch data", error);
        }
      }
   const calculateStayDuration =() => {
      if (bookingData.checkInDate && bookingData.checkOutDate) {
        console.log("Total stay = ", differenceInDays(bookingData.checkOutDate, bookingData.checkInDate) );
        
        return  differenceInDays(bookingData.checkOutDate, bookingData.checkInDate);
      }
      return 0;
    };
  
        const calculateTotal = () => {
          const duration = calculateStayDuration();
          console.log("Stay Duration: " + duration);
          
          if (duration > 0) {
            const total = duration * hotelData.price + (hotelData.price * 0.18);
            console.log("Price : ", hotelData.price);
            console.log("Tax : " , (hotelData.price * 0.18));
            
            console.log("Total = " + total);
            setBookingData((prevData) => ({
              ...prevData,
              totalAmount: total,
            }));
          } else {
            alert("Check-out date must be after check-in date.");
          }
        };
      
        useEffect( () =>{
          fetchHotelDetails();
        } , [])

  useEffect(() => {
    if (hotelData) {
      calculateTotal();
    }
  }, [hotelData, bookingData.checkInDate, bookingData.checkOutDate]);



  return (
    <div className="flex flex-col text-white justify-center items-center ">

     {value = "Hotel Details"}

        <input
        type="text"
        required
        name="title"
        className={`${styling}`}
        value={hotelData.title}
        disabled
      />
        <input
        type="text"
        required
        name="city"
        className={`${styling}`}
        value={hotelData.city}
        disabled
      />
        <input
        type="text"
        required
        name="title"
        className={`${styling}`}
        value={hotelData.title}
        disabled
      />
      <h2>Confirm Booking</h2>
      <p className={`${styling}`}>Rooms: {bookingData.room}</p>
      <p className={`${styling}`}>Total Cost: ₹{ (bookingData.totalAmount).toLocaleString("INR") || "Calculating..."}</p>
      <button onClick={handlePrevious}>Back</button>
      <button onClick={handleNext}>Confirm</button>
    </div>
  );
};

export default BookingDetails;
