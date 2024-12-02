import axios from 'axios';
import React from 'react'
import { useState  } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [loginUser , setLoginUser] = useState({
        username:"",
        email:"",
        password:""
    });

    const handleInputChange = (e) =>{
        setLoginUser({...loginUser , [e.target.name] : e.target.value})
    };

    const handleSubmitForm = async(e) => {
        e.preventDefault();
        console.log(loginUser);
        const formData = new FormData();
        formData.append("username" , loginUser.username);
        formData.append("email" , loginUser.email);
        formData.append("password" , loginUser.password);

        try {
            let response = await axios.post('http://localhost:8000/api/v1/user/login' , formData );
            console.log(response.data.loginUser);
            
            if(response.status === 200){
                setLoginUser({
                    username:"",
                    email:"",
                    password:""
                })
                navigate('/');
            }
            else{
                console.error("User cannot be logged in" );
                alert("User cannot be LoggedIN !")
            }
        } catch (error) {
            console.error("Failed to Log in the new user" , error);
            
        }
    }

  return (
    <>
    <h1>This is a User Login Page</h1>
    <form
      className="border-gray-500 border-2 w-max m-auto p-5 rounded-lg"
      onSubmit={handleSubmitForm}
    >
      <br />
      <input
        type="text"
        placeholder="enter username"
        required
        name="username"
        className="border-gray-500 border-2"
        onChange={handleInputChange}
        value={loginUser.username}
      ></input>
      <br />
      <br />
      <input
        type="email"
        placeholder="enter email "
        required
        name="email"
        className="border-gray-500 border-2"
        onChange={handleInputChange}
        value={loginUser.email}
      ></input>
      <br />
      <input
        type="password"
        placeholder="enter strong password "
        required
        name="password"
        className="border-gray-500 border-2"
        onChange={handleInputChange}
        value={loginUser.password}
      ></input>
      <br />
      <br /> <br />
      <button type="submit" className="border-gray-500 border-2">
        Login User
      </button>
    </form>
    </>
  )
}

export default Login
