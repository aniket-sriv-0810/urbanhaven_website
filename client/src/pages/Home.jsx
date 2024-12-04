import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link  } from 'react-router-dom';

const Home = () => {
  const [loading , setLoading] = useState(true);
  const [hotel , setHotel] = useState([])
  const deleteHotel = async(id) => {
    try {
      let response = await axios.delete(`http://localhost:8000/api/v1/hotel/${id}/delete`);
      console.log(response.data.message);
      setHotel(hotel.filter((id) =>id !== hotel._id))
    } catch (error) {
      console.log("Error in deleting hotel" , error);
    }
  }
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
   <h1>This is a Home Page</h1>
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
      <Link to={`/hotel/${hotelItem._id}/edit`}>
      <button className="border-gray-500 border-2">Edit Hotel</button>
    </Link><br/><br/>
    <button className="border-gray-500 border-2" onClick={()=>{deleteHotel(hotelItem._id)}}>Delete Hotel</button>
      </ul>
      </div>

      )
    })
    }
   </div>
   </>
  )
}

export default Home
