import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const UserAccount = () => {
    const [showUser , setShowUser] = useState(null);
    const {id} = useParams();

    const userDetails = async() => {
       try {
         const response = await axios.get(`http://localhost:8000/api/v1/user/${id}/account`)
         if(!response)
             console.log("Error getting user !");

            console.log(response.data);
            
         setShowUser(response.data.data.userInfo)

       } catch (error) {
        console.error("failed to get user" , error);
        
       }
    }
    useEffect(() =>{
        userDetails();
    } , [])
  return (
 <>
  <h1> Hi User !</h1>
 </>
  )
}

export default UserAccount
