import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useUser } from "../components/userContext/userContext";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginUser = () => {
  const navigate = useNavigate();

  const { setUser } = useUser();
  const [loginUser, setLoginUser] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
      username: '',
      password: '',
    });

  const inputRefs = {
    username: useRef(),
    password: useRef(),
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {};
  
    // Username Validation
    if (!loginUser.username) {
      errors.username = "Username is required!";
      isValid = false;
    }

    // Password Validation
    if (!loginUser.password) {
      errors.password = "Password is required!";
      isValid = false;
    } else if (loginUser.password.length < 6) {
      errors.password = "Invalid password credentials !";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginUser({ ...loginUser, [name]: value });

    if (inputRefs[name].current) {
      if (value) {
        inputRefs[name].current.style.color = "white";
        inputRefs[name].current.style.textAlign = "center";
        inputRefs[name].current.style.backgroundColor = "#5454544f";
      } 
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
     // Perform client-side validation
     const isValid = validateForm();
     if (!isValid) {
       return; // If validation fails, do not proceed
     }
    const dataSent = {
      username: loginUser.username,
      password: loginUser.password,
    };
    console.log("Data sent by frontend => ", dataSent);
    
    try {
      let response = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        dataSent,
        { withCredentials: true }
      );

      if (response.status === 200) {
        const loginData = response.data.data.loggedInUser;
        setLoginUser({ username: "", password: "" });
        setUser(loginData);
        localStorage.setItem("user", JSON.stringify(loginData));
       navigate('/user/login/confirmed')
      } else {
        console.error("User cannot be logged in");
        toast.error("Failed to log in. Please check your credentials.");
      }
    } catch (error) {
      console.log("login error : " + error);
      
      console.log("Error : " , error.response.data);
  // Handle Backend Validation Errors
  // Handle Backend Validation Errors
  if (error.response && error.response.data.details) {
    const backendErrors = error.response.data.details.reduce((acc, message) => {
      if (message.toLowerCase().includes("username")) {
        acc.username = message;
      } else if (message.toLowerCase().includes("password")) {
        acc.password = message;
      } else {
        acc.global = message;
      }
      return acc;
    }, {});
    setFormErrors(backendErrors);
  } else if (error.response && error.response.data.message) {
    setFormErrors({ global: error.response.data.message });
  } else {
    setFormErrors({ global: "An unexpected error occurred." });
  }

}
  };

  const inputStyling =
    " border border-gray-300 rounded-xl p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#5454544f] placeholder:text-center placeholder:capitalize placeholder:text-white valid:border-green-400 valid:border-2";

  return (
    <>
      <div className="bg-[url('/assets/bg.jpg')] bg-cover flex flex-col justify-center items-center bg-purple-200 min-h-screen px-4 md:px-8">
        <h1 className="text-white text-2xl font-semibold text-center mb-5 mt-2 sm:text-3xl">
          Log in to your Account
        </h1>
        <div className="flex flex-col border-2 border-white rounded-xl p-6 bg-[#212521] max-w-md md:w-[65%]">
          <h2 className="text-white text-center font-bold text-xl mb-5">
            Verify Your Credentials
          </h2>
          {formErrors && <p className="text-red-500 font-semibold text-base -mt-3 mb-2 text-center">{formErrors.username}</p>}
          <form
            className="flex flex-col gap-y-4 lg:p-5"
            onSubmit={handleSubmitForm}
          >
            <input
              type="text"
              placeholder="Enter username"
              required
              name="username"
              ref={inputRefs.username}
              className={`${inputStyling} ${formErrors.username || formErrors.password ? 'valid:border-red-500' : ''}`}
              onChange={handleInputChange}
              value={loginUser.username}
            />
            <input
              type="password"
              placeholder="Enter strong password"
              required
              name="password"
              ref={inputRefs.password}
              className={`${inputStyling} ${formErrors.username || formErrors.password ? 'valid:border-red-500' : ''}`}
              onChange={handleInputChange}
              value={loginUser.password}
            />
            {formErrors.password && <p className="text-red-500 text-sm -mt-3 text-center">{formErrors.password}</p>}
           
            <div className="text-center text-gray-400 mt-2 text-sm sm:text-base ">
              <span >Don’t have an account?{" "}</span>
              <NavLink to="/user/register" className="text-sky-500 hover:underline">
                 Register
              </NavLink>
            </div>

            <button
              type="submit"
              className="w-full border-gray-500 border-2  font-semibold bg-green-600 px-4 py-2 text-white rounded-xl mt-4 hover:bg-green-700 "
            >
              Verify Now
            </button>
            
          </form>
        </div>
      </div>
   
    </>
  );
};

export default LoginUser;
