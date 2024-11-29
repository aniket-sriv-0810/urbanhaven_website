import React, { useEffect, useState } from 'react'
import axios from 'axios';
const Contact = () => {
  const [message , setMessage] = useState('');
  const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/v1/contact', {
            withCredentials: true // Include credentials like cookies if needed
        });
        console.log(response.data.msg);
        setMessage(response.data.msg);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
useEffect(()=>{
  fetchData();
},[])
  return (
    <>
    <h1>This is a Contact Form</h1><br/><br/>
    <h1>{message}</h1>
    </>
  )
}

export default Contact
