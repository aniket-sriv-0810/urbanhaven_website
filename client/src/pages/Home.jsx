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
      toast.info(' List of all hotels !', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
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
 <div className="flex justify-center mt-5">
 <CurrencyExchange
   setCurrencyRates={setConversionRate}
   selectedCurrency={selectedCurrency}
   setSelectedCurrency={setSelectedCurrency}
 />
 <div>
   <p>
     {currencySymbols[selectedCurrency]} {1000 * conversionRate}
   </p>
 </div>
 <input type='text' placeholder='Search hotels by city' className='bg-gray-400 placeholder:text-black border-2 border-white rounded-lg placeholder:text-center'/>
</div>

   <div className='flex flex-row flex-wrap justify-center gap-9 mt-5 '>
   { loading> 0 ?
    <p>Hotels Loading...</p>
    :
    hotel.map((hotelItem) =>{
      // Dynamically calculate price and tax based on conversion rate
      const convertedPrice = (hotelItem.price * conversionRate).toFixed(3);
      const convertedTax = (0.18 * hotelItem.price * conversionRate).toFixed(3);


            // Show currency symbol and amount
            const priceDisplay = `${currencySymbols[selectedCurrency]} ${convertedPrice}`;
            const taxDisplay = `${currencySymbols[selectedCurrency]} ${convertedTax}`;
      return(
        
        <div key={hotelItem._id} className='border-2 border-black rounded-2xl w-80 h-max  hover:bg-purple-300'>
      
      <ul className='text-center' >
      <div className="relative">
      <div className='absolute top-2 left-2 z-20'>
      <ShareBtn 
      hotelName={hotelItem.title} 
      hotelLink={`https://localhost:5173/hotel/${hotelItem.id}`} />
      </div>
      <div className="absolute  right-2 z-20">
        <LikeBtn />
      </div>
      <img src={hotelItem.image} alt={hotelItem.title} className="z-0 rounded-t-2xl" />
    </div>
      <h2 className='text-xl pt-3 font-medium'>{hotelItem.title}</h2>
      <li> <p>{hotelItem.city} , {hotelItem.state} , {hotelItem.country} </p></li>
      <li className="text-xl text-center pt-3 font-medium">
      {/* Display price and tax with correct currency */}
      {priceDisplay}
      <span className="text-gray-500 font-normal text-sm">
        /- per night <br />
        + {taxDisplay} taxes
      </span>
    </li>
    <div className='flex flex-row justify-around mt-3'>
      <Link to={`/hotel/${hotelItem._id}`}>
      <button className="bg-green-600 text-white px-4 py-2 rounded-2xl ml-4 w-28">View</button><br/><br/>
    </Link>
      <Link to={`/hotel/${hotelItem._id}`}>
      <button className="bg-red-600 text-white px-4 py-2 rounded-2xl ml-4 w-28">Book Now</button><br/><br/>
    </Link>
    </div>
      </ul>
      </div>

      )
    })
    }
   </div>
   <div className="flex justify-center items-center">
  <img 
    src={Banner} 
    alt="Banner" 
    className="w-full h-auto max-w-screen-lg rounded-2xl my-10" 
  />
</div>

   <div className="bg-gray-50 flex justify-evenly">
      <Counter start={0} end={1000} duration={3000} value={"Hotels Listed"} />
      <Counter start={0} end={6000} duration={3000} value={"Users Registered"} />
      <Counter start={0} end={500} duration={3000} value={"Cities Available"} />
      <Counter start={0} end={2000} duration={3000} value={"Average Customer Feedback"} />
    </div>
   <ToastContainer
   position="top-right"
   autoClose={2000}
   hideProgressBar={false}
   newestOnTop={false}
   closeOnClick
   rtl={false}
   pauseOnFocusLoss
   draggable
   pauseOnHover={false}
   theme="light"
   transition={Bounce}
   />
   <Footer/>
   </>
  )

}

export default Home
