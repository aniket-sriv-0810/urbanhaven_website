import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link  } from 'react-router-dom';
import Header from '../components/Header/Header';
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
   <h1>This is a Home Page</h1>
   <Header/>
   <div className='flex flex-row flex-wrap justify-center gap-3'>
   { loading> 0 ?
    <p>Hotels Loading...</p>
    :
    hotel.map((hotelItem) =>{
      return(
        <div key={hotelItem._id} className='border-2 border-black rounded-lg w-max'>
      <ul className='text-center' >
      <img src={hotelItem.image} alt={ hotelItem.title} className='w-60 rounded-lg m-auto' />
      <h2>{hotelItem.title}</h2>
      <li>{hotelItem.description}</li>
      <li>Rs {hotelItem.price}</li>
      <li> <p>{hotelItem.city} , {hotelItem.state} , {hotelItem.country} </p></li>
      <Link to={`/hotel/${hotelItem._id}`}>
      <button className="border-gray-500 border-2">Show Hotel</button><br/><br/>
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
