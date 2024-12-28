import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link  } from 'react-router-dom';
import Banner from '../assets/banner.png';
import {  Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Home = () => {
  const [loading , setLoading] = useState(true);
  const [hotel , setHotel] = useState([])
 
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
 <img src={Banner} alt="banner" className='w-full rounded-xl' />
   <div className='flex flex-row flex-wrap justify-center gap-9 mt-5 '>
   { loading> 0 ?
    <p>Hotels Loading...</p>
    :
    hotel.map((hotelItem) =>{
      return(
        <div key={hotelItem._id} className='border-2 border-black rounded-2xl w-80 bg-red-100  hover:bg-purple-300'>
      <ul className='text-center' >
      <img src={hotelItem.image} alt={ hotelItem.title} className='w-max rounded-2xl m-auto' />
      <h2 className='text-xl pt-3 font-medium'>{hotelItem.title}</h2>
      <li>{hotelItem.description}</li>
      <li> <p>{hotelItem.city} , {hotelItem.state} , {hotelItem.country} </p></li>
      <li className='text-xl text-center pt-3 font-medium'>Rs {hotelItem.price.toLocaleString('INR')} <span className='text-gray-500 font-normal text-sm'> /-per night <br></br>+ Rs {(0.18*(hotelItem.price)).toLocaleString('INR')} taxes</span> </li>
      <Link to={`/hotel/${hotelItem._id}`}>
      <button className="bg-green-600 text-white px-4 py-2 rounded-2xl ml-4 w-40">Show Hotel</button><br/><br/>
    </Link>
  
      </ul>
      </div>

      )
    })
    }
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
   </>
  )
}

export default Home
