import React, { useState } from 'react'
import BookingCalender from '../components/Calender/BookingCalender'

const HotelBooking = () => {
    const [booking , setBooking] = useState({
        name:'', phone:''
    })
    const handleInputChange = (e) =>{
        setBooking({...booking , [e.target.name] : e.target.value}
        )}
  return (
    <>
    <form>
    <div id="user-details">
    <input type="text" placeholder='Enter Your Name' name="name" value={booking.name} onChange={handleInputChange}/>
    <input type="number" placeholder='Enter Your Phone' name="phone" value={booking.phone} onChange={handleInputChange}/>
    <input type="email" placeholder='Enter Your Email' name="email" value={booking.email} onChange={handleInputChange}/>
    <BookingCalender/>
    <select><option></option></select>
    </div>
    </form>
    </>
  )
}

export default HotelBooking
