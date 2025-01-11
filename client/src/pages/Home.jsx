import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link  } from 'react-router-dom';
import Banner from '../assets/banner.png';
import {  Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LikeBtn from '../components/LikeBtn/LikeBtn';
import ShareBtn from "../components/ShareBtn/ShareBtn";
import CurrencyExchange from '../components/CurrencyExchange/CurrencyExchange';
import Navbar from '../components/Navbar.jsx/Navbar';
import Counter from '../components/Counter/Counter';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
const currencySymbols = {
  INR: '₹',
  USD: '$',
  EURO: '€',
  POUND: '£',
};

const Home = () => {
  

  const [loading , setLoading] = useState(true);
  const [hotel , setHotel] = useState([])
  const [conversionRate, setConversionRate] = useState(1); // Default conversion rate for INR
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const fetchData = async() =>{
    try {
      const response = await axios.get("http://localhost:8000/" , {
        withCredentials: true
      })
      
      console.log(response.data);
      setHotel(response.data.data.allHotel);
      setLoading(false);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);

    }
  }
  useEffect(() =>{
    fetchData();
  } ,[]);
  return (
   <>
   <Navbar />
   <Header/>
<div className='flex justify-center items-center'>
 <input type='text' placeholder='Search hotels by city' className='bg-gray-400 p-2 w-80 m-3 placeholder:text-black border-2 border-white rounded-lg placeholder:text-center'/>
 </div>
 <div className='flex justify-between items-center p-3 mt-3'>
 <CurrencyExchange
   setCurrencyRates={setConversionRate}
   selectedCurrency={selectedCurrency}
   setSelectedCurrency={setSelectedCurrency}
 />
 <CurrencyExchange
   setCurrencyRates={setConversionRate}
   selectedCurrency={selectedCurrency}
   setSelectedCurrency={setSelectedCurrency}
 />

 </div>
 <h1 className='text-center font-semibold text-xl sm:text-3xl text-black p-4'>List of our all Top Hotels</h1>
 <div className="flex flex-wrap justify-evenly gap-8 mt-5 px-4">
  {loading > 0 ? (
    <p className="text-lg text-gray-600">Hotels Loading...</p>
  ) : (
    hotel.map((hotelItem) => {
      const convertedPrice = (hotelItem.price * conversionRate).toFixed(2);
      const convertedTax = (0.18 * hotelItem.price * conversionRate).toFixed(2);

      const priceDisplay = `${currencySymbols[selectedCurrency]} ${convertedPrice}`;
      const taxDisplay = `${currencySymbols[selectedCurrency]} ${convertedTax}`;

      return (
        <div
          key={hotelItem._id}
          className="bg-white border border-gray-300 shadow-md shadow-gray-500 rounded-xl w-full sm:w-96 md:w-80 hover:shadow-2xl transition-transform transform hover:-translate-y-2"
        >
          <div className="relative">
            <div className="absolute top-3 left-3 z-20">
              <ShareBtn
                hotelName={hotelItem.title}
                hotelLink={`https://localhost:5173/hotel/${hotelItem.id}`}
              />
            </div>
            <div className="absolute  right-3 z-20">
              <LikeBtn />
            </div>
            <img
              src={hotelItem.image}
              alt={hotelItem.title}
              className="rounded-t-xl h-48 w-full "
            />
          </div>
          <div className="p-4">
            <h2 className="text-2xl font-semibold text-gray-800 truncate">
              {hotelItem.title}
            </h2>
            <p className="text-gray-500 mt-1">
              {hotelItem.city}, {hotelItem.state}, {hotelItem.country}
            </p>
            <p className="text-lg font-medium mt-3 text-gray-900">
              {priceDisplay}
              <span className="text-sm text-gray-500 font-light">
                /- per night <br />+ {taxDisplay} taxes
              </span>
            </p>
            <div className="flex justify-between mt-4">
              <Link to={`/hotel/${hotelItem._id}`}>
                <button className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition">
                  View
                </button>
              </Link>
              <Link to={`/hotel/${hotelItem._id}/booking`}>
                <button className="bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    })
  )}
</div>

<div className="flex justify-center items-center px-4">
<img
  src={Banner}
  alt="Banner"
  className="w-full h-auto max-w-screen-lg rounded-2xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl my-10"
/>
</div>


<div className="bg-gray-50 flex flex-col justify-evenly items-center sm:flex-row gap-6 py-10">
<Counter start={0} end={1000} duration={2000} value="Hotels Listed" color="black" />
<Counter start={0} end={6000} duration={2000} value="Users Registered" color="green" />
<Counter start={0} end={500} duration={2000} value="Cities Available" color="sky" />
<Counter start={0} end={2000} duration={2000} value="Customer Feedbacks" color="red" />
</div>
  
   <Footer/>
   </>
  )

}

export default Home
