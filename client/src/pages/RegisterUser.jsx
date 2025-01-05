import axios from 'axios';
import React, { useRef } from 'react'
import { useState  } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {useUser} from '../components/userContext/userContext';

import './RegisterUser.module.css'
const RegisterUser = () => {
  const {setUser} = useUser();
    const navigate = useNavigate();
    const [image , setImage] = useState(null);
    const [newUser , setNewUser] = useState({
        name:"",
        username:"",
        phone:"",
        email:"",
        password:""
    });
      // Ref to access all input elements in the form
  const inputRefs = {
    name: useRef(),
    username: useRef(),
    phone: useRef(),
    email: useRef(),
    password: useRef(),
  };

    const handleInputChange = (e) =>{
      const { name, value } = e.target;
        setNewUser({...newUser , [name] : value})
        // Apply styles dynamically for all inputs
    if (inputRefs[name].current) {
      if (value) {
        inputRefs[name].current.style.color = 'white';  // Green text color for filled input
        inputRefs[name].current.style.backgroundColor = '#5454544f';  // Light green background
      } else {
        inputRefs[name].current.style.color = 'white';  // Red text color for empty input
        inputRefs[name].current.style.backgroundColor = '#5454544f';  // Light red background
      }
    }
  };

    const handleFileChange = (e) => {
        setImage(e.target.files[0])
    };
    // Manipulating input value style directly using DOM
    
  
    const handleSubmitForm = async(e) => {
        e.preventDefault();
        console.log(newUser);
        const formData = new FormData();
        formData.append("name" , newUser.name);
        formData.append("username" , newUser.username);
        formData.append("phone" , newUser.phone);
        formData.append("email" , newUser.email);
        formData.append("password" , newUser.password);
        if(image){
            formData.append("image" , image);
        }

        try {
            let response = await axios.post('http://localhost:8000/api/v1/user/register' , formData );
            console.log(response.data.user);
            if(response.status === 200){
                setNewUser({
                    name:"",
                    username:"",
                    phone:"",
                    email:"",
                    password:""
                });
                console.log(response.data);
                setUser(response.data.data.registerNewUser); 
                console.log("setUser = ", response.data.data.registerNewUser);
                
                setImage(null);
                navigate('/');
            }
            else{
                console.error("User cannot be registered" );
                alert("User cannot be registered !")
            }
        } catch (error) {
            console.error("Failed to register the new user" , error);
            
        }
    }

    const inputStyling= "border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#5454544f] placeholder:text-center"
 
  return (
    <>
   <div className="bg-[url('/assets/bg.jpg')] bg-cover  flex flex-col justify-center items-center flex-wrap bg-purple-200 min-h-screen gap-5">
  
    <h1 className='text-white text-3xl font-semibold '>Create Your Account</h1>
   <div className='flex flex-col border-2 border-white rounded-xl p-3 bg-[#282729]'>
   <h1 className='text-white text-center font-bold text-2xl  mt-3'>Enter Your Credentials</h1>
   <form
   className=" p-10 w-[25rem] rounded-lg flex flex-col gap-y-4 -mt-3 "
   onSubmit={handleSubmitForm}
   >
      <input
        type="text"
        placeholder="enter your name"
        required
        ref={inputRefs.name}
        name="name"
        className={inputStyling}
        onChange={handleInputChange}
        value={newUser.name}
      ></input>

      <input
        type="text"
        placeholder="enter your username"
        required
        name="username"
        ref={inputRefs.username}
        className={inputStyling}
        onChange={handleInputChange}
        value={newUser.username}
      ></input>
      <input
        type="number"
        placeholder="enter phone number "
        required
        ref={inputRefs.phone}
        name="phone"
        className={inputStyling}
        onChange={handleInputChange}
        value={newUser.phone}
      ></input>
  
      <input
        type="email"
        placeholder="enter your email "
        required
        name="email"
        ref={inputRefs.email}
        className={inputStyling}
        onChange={handleInputChange}
        value={newUser.email}
      ></input>

      <input
        type="password"
        placeholder="enter strong password "
        required
        name="password"
        ref={inputRefs.password}
        className={inputStyling}
        onChange={handleInputChange}
        value={newUser.password}
      ></input>
     <div className='flex justify-evenly mt-5'> <input type="checkbox" required className="form-checkbox h-5 w-5  border-gray-300 rounded "
        />
         <span className='text-white -mt-1'>I agree to all the terms & conditions</span></div>
     <div className='flex justify-center mt-3 text-md text-gray-400'>Already have an account ? &nbsp;<NavLink to="/user/login"><span className='text-blue-500'>Login</span></NavLink></div>
      <button type="submit" className="border-gray-500 border-2 mt-6 bg-green-600 px-2 py-2 text-white rounded-xl">
        Create Account
      </button>
    </form>
    </div>

    </div>
    </>
  )
}

export default RegisterUser
