import axios from 'axios';
import React, { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../components/userContext/userContext';

const RegisterUser = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    phone: '',
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    username: '',
    phone: '',
    email: '',
    password: '',
  });

  const inputRefs = {
    name: useRef(),
    username: useRef(),
    phone: useRef(),
    email: useRef(),
    password: useRef(),
  };
  const validateForm = () => {
    let isValid = true;
    let errors = {};
  
    // Name Validation
    if (!newUser.name) {
      errors.name = "Name is required!";
      isValid = false;
    }
  
    // Username Validation
    if (!newUser.username) {
      errors.username = "Username is required!";
      isValid = false;
    }
  
    // Phone Validation (Optional - Must be 10 digits if present)
    if (newUser.phone && !/^[0-9]{10}$/.test(newUser.phone)) {
      errors.phone = "Phone number must be a 10-digit number.";
      isValid = false;
    }
  
    // Email Validation
    if (!newUser.email) {
      errors.email = "Email is required!";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
      errors.email = "Invalid email format.";
      isValid = false;
    }
  
    // Password Validation
    if (!newUser.password) {
      errors.password = "Password is required!";
      isValid = false;
    } else if (newUser.password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }
  
    setFormErrors(errors);
    return isValid;
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });

    if (inputRefs[name].current) {
      inputRefs[name].current.style.color = value ? 'white' : 'black';
      inputRefs[name].current.style.textAlign = 'center';
      inputRefs[name].current.style.backgroundColor = '#5454544f';
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
      name: newUser.name,
      username: newUser.username,
      phone: newUser.phone,
      email: newUser.email,
      password: newUser.password,
    };
    console.log("data sent by Frontend : => ", dataSent);

    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/user/register',
        dataSent,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setNewUser({
          name: '',
          username: '',
          phone: '',
          email: '',
          password: '',
        });
        setUser(response.data.data.registerNewUser);
        navigate('/user/register/authentication');
      }
    } catch (error) {
    console.log("Error : " , error.response.data.details);
    if (error.response && error.response.data.details) {
      const backendErrors = error.response.data.details.reduce((acc, message) => {
        if (message.includes('Name')) {
          acc.name = message;
        } else if (message.includes('Username')) {
          acc.username = message;
        } else if (message.includes('Phone')) {
          acc.phone = message;
        } else if (message.includes('Email')) {
          acc.email = message;
        } else if (message.includes('Password')) {
          acc.password = message;
        }
        return acc;
      }, {});
      setIsError(true);
      setFormErrors(backendErrors);
    } else {
      // Handle any unexpected errors
      setFormErrors({ global: "An unexpected error occurred." });
    }
    }
  };

  const inputStyling =
    'border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#5454544f] placeholder:text-center placeholder:capitalize placeholder:text-white valid:border-green-400 valid:border-2 ';

  return (
    <div className="bg-[url('/assets/bg.jpg')] bg-cover flex flex-col justify-center items-center bg-purple-200 min-h-screen px-4 md:px-8">
      <h1 className="text-white text-3xl font-semibold text-center mb-5 mt-2">Create Your Account</h1>
      <div className="flex flex-col border-2 border-white rounded-xl p-7 mb-3 bg-[#212125] max-w-md md:w-[60%]">
        <h2 className="text-white text-center font-bold text-xl mb-5 break-all">Enter Your Credentials</h2>
        <form className="flex flex-col gap-y-4 lg:p-5" onSubmit={handleSubmitForm}>
          <input
            type="text"
            placeholder="Enter your name"
            required
            ref={inputRefs.name}
            name="name"
            className={`${inputStyling} ${formErrors.name ? 'valid:border-red-500' : ''}`}
            onChange={handleInputChange}
            value={newUser.name}
            title="please enter your name"
          />
          {formErrors.name && <p className="text-red-500 text-sm -mt-3 text-center">{formErrors.name}</p>}
          
          <input
            type="text"
            placeholder="Enter your username"
            required
            ref={inputRefs.username}
            name="username"
            className={`${inputStyling} ${formErrors.username ? ' valid:border-red-500' : ''}`}
            onChange={handleInputChange}
            value={newUser.username}
            title="please enter your username"
          />
          {formErrors.username && <p className="text-red-500 text-sm -mt-3 text-center">{formErrors.username}</p>}
          
          <input
            type="number"
            placeholder="Enter phone number"
            required
            ref={inputRefs.phone}
            name="phone"
            className={`${inputStyling} ${formErrors.phone ? "valid:border-red-500" : ''} `}
            onChange={handleInputChange}
            value={newUser.phone}
            title="please enter your phone number"
          />
          {formErrors.phone && <p className="text-red-500 text-sm -mt-3 text-center">{formErrors.phone}</p>}
          
          <input
            type="email"
            placeholder="Enter your email"
            required
            ref={inputRefs.email}
            name="email"
            className={`${inputStyling} ${formErrors.email ? 'valid:border-red-500' : ''}`}
            onChange={handleInputChange}
            value={newUser.email}
            title="please enter your email"
          />
          {formErrors.email && <p className="text-red-500 text-center text-sm -mt-3 ">{formErrors.email}</p>}
          
          <input
            type="password"
            placeholder="Enter strong password"
            required
            ref={inputRefs.password}
            name="password"
            className={`${inputStyling} ${formErrors.password ? "valid:border-red-500" : ''}  `}
            onChange={handleInputChange}
            value={newUser.password}
            title="please enter your password"
          />
          {formErrors.password && <p className="text-red-500 text-sm -mt-3 text-center ">{formErrors.password}</p>}
          
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="check"
              required
              className="form-checkbox h-5 w-5 border-gray-700 accent-green-600"
              title="kindly agree to our terms and conditions"
            />
            <label htmlFor="check" className="sm:text-base md:text-base lg:text-sm xl:text-base 2xl:text-base text-gray-300 text-sm">
              I agree to all the{' '}
              <span className="text-blue-400 hover:underline" title="view our terms and conditions">
                <NavLink to="/conditions">terms and conditions</NavLink>
              </span>
            </label>
          </div>
          <div className="text-center text-gray-400 mt-2">
            Already have an account?{' '}
            <NavLink to="/user/login" className="text-sky-500 hover:underline">
              Login
            </NavLink>
          </div>
          <button
            type="submit"
            className="w-full border-gray-500 font-semibold border-2 bg-green-600 px-4 py-2 text-white rounded-xl mt-4 2xl:p-3 hover:bg-green-700"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
