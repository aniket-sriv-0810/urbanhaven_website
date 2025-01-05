import axios from 'axios';
import React from 'react'
import { useState  } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {useUser} from '../components/userContext/userContext';
import './user/RegisterUser.css'
import userVideo from '../assets/Sign Up form.mp4';
import icon from '../assets/icon.png';
import { FaRegUser } from "react-icons/fa";
import './RegisterUser.css'
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

    const handleInputChange = (e) =>{
        setNewUser({...newUser , [e.target.name] : e.target.value})
    };
    const handleFileChange = (e) => {
        setImage(e.target.files[0])
    };
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
                setUser(response.data.data.registerNewUser.name);
                console.log("setUser = ", response.data.data.registerNewUser.name);
                
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

 
  return (
    <>
   <div className="bg-[url('/assets/auth.png')] bg-cover bg-bottom flex flex-col justify-center items-center flex-wrap bg-purple-200 min-h-screen gap-5">
  
    <h1 className='text-white text-3xl font-semibold '>Create Your Account</h1>
   <div className='flex flex-col border-2 border-white rounded-xl p-3'>
   <h1 className='text-white text-center font-bold text-2xl  mt-3'>Enter Your Credentials</h1>
   <form
   className=" p-10 w-[25rem] rounded-lg flex flex-col -mt-3 "
   onSubmit={handleSubmitForm}
   >
    <p><FaRegUser className='text-white' /></p>
      <input
        type="text"
        placeholder="enter name"
        required
        name="name"
        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleInputChange}
        value={newUser.name}
      ></input>
      <br />
      <input
        type="text"
        placeholder="enter username"
        required
        name="username"
        className="border-gray-500 border-2"
        onChange={handleInputChange}
        value={newUser.username}
      ></input>
      <br />
      <input
        type="number"
        placeholder="enter phone number "
        required
        name="phone"
        className="border-gray-500 border-2"
        onChange={handleInputChange}
        value={newUser.phone}
      ></input>
      <br />
      <input
        type="email"
        placeholder="enter email "
        required
        name="email"
        className="border-gray-500 border-2"
        onChange={handleInputChange}
        value={newUser.email}
      ></input>
      <br />
      <input
        type="password"
        placeholder="enter strong password "
        required
        name="password"
        className="border-gray-500 border-2"
        onChange={handleInputChange}
        value={newUser.password}
      ></input>
     <div className='flex justify-evenly mt-5'> <input type="checkbox" required/> <span className='text-white'>I agree to all the terms & conditions</span></div>
     <div className='flex justify-center mt-3 text-md'>Already have an account ? &nbsp;<NavLink to="/user/login"><span className='text-white'>Login</span></NavLink></div>
      <button type="submit" className="border-gray-500 border-2 mt-6">
        Register User
      </button>
    </form>
    </div>

    </div>
    </>
  )
}

export default RegisterUser
