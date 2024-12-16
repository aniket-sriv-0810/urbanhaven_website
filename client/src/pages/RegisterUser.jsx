import axios from 'axios';
import React from 'react'
import { useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import {useUser} from '../components/userContext/userContext';
import './user/RegisterUser.css'
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
   
    <h1>This is a User Registration Page</h1>
    <form
      className="border-gray-500 border-2 w-max m-auto p-5 rounded-lg"
      onSubmit={handleSubmitForm}
    >
      <input
        type="text"
        placeholder="enter name"
        required
        name="name"
        className="border-gray-500 border-2"
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
      <br />
      <input type="file" name="image" onChange={handleFileChange} />
      <br />
      <br /> <br />
      <button type="submit" className="border-gray-500 border-2">
        Register User
      </button>
    </form>

    </>
  )
}

export default RegisterUser
