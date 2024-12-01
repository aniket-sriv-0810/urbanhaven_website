import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
const Home = () => {
  const [hotel , setHotel] = useState([])
  const fetchData = async() =>{
    try {
      const response = await axios.get("http://localhost:8000/" , {
        withCredentials: true
      })
      console.log(response.data.allHotel);
      setHotel(response.data.allHotel);

    } catch (error) {
      console.error('Error fetching data:', error);

    }
  }
  useEffect(() =>{
    fetchData();
  } ,[]);
  return (
   <>
   <h1>This is a Home Page</h1>
   <div className='flex flex-row flex-wrap justify-center gap-3'>
   { hotel.length > 0 ?
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
      <button className="border-gray-500 border-2">Show Hotel</button>
    </Link>
      </ul>
      </div>

      )
    })
    :
    <p>Hotels Loading...</p> }
   </div>
   </>
  )
}

export default Home
