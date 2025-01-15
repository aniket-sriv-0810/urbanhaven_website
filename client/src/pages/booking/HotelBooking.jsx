import React ,{useEffect, useState}from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {useUser} from '../../components/userContext/userContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInDays } from "date-fns";
const HotelBooking = () => {
    const {user} = useUser();
    const {id} = useParams();
    const navigate = useNavigate();
    const [hotelData , setHotelData] = useState({});
    const [bookingData , setBookingData] = useState({
      checkInDate: "",
      checkOutDate: "",
      room:1,
      adultCount:1,
      infantCount:0,
      totalAmount:0,
      paymentDetails:"",
      status:"Pending",
    });

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

    const handleDateChange = (date, fieldName) => {
      setBookingData({ ...bookingData, [fieldName]: date });
    };
      const calculateStayDuration = () => {
        if (bookingData.checkInDate && bookingData.checkOutDate) {
          return differenceInDays(bookingData.checkOutDate, bookingData.checkInDate);
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
        } else {
          alert("Check-out date must be after check-in date.");
        }
      };


useEffect(() =>{
  fetchHotelDetails();
  calculateStayDuration();
  calculateTotal();
} , [id])

  return (
    <>
    <h1>Booking Form</h1>
    <h1>User Details</h1>
    <ul>
    <li>{user.name}</li>
    <li>{user._id}</li>
    <li>{user.phone}</li>
    <li>{user.email}</li>
    </ul>
 
    <ul>
    <li>{hotelData.title}</li>
    <li>{hotelData._id}</li>
    <li>{hotelData.price}</li>
    <li>{hotelData.city}</li>
    </ul>
     <DatePicker
                    selected={bookingData.checkInDate}
                    onChange={(date) => handleDateChange(date, "checkInDate")}
                    dateFormat="dd-MM-yyyy"
                    minDate={new Date()}
                    placeholderText="Select Check-in Date"
                    className="border rounded-md p-2"
                  />
                  <DatePicker
                    selected={bookingData.checkOutDate}
                    onChange={(date) => handleDateChange(date, "checkOutDate")}
                    dateFormat="dd-MM-yyyy"
                    minDate={bookingData.checkInDate || new Date()}
                    placeholderText="Select Check-out Date"
                    className="border rounded-md p-2"
                  />
    </>
    
  )
}

export default HotelBooking;
