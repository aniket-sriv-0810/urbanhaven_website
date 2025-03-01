import React from "react";
import UserForm from "./UserForm";
import { NavLink } from "react-router-dom";
import AuthSuccessPopup from "../../loaders/AuthSuccessPopup";
const RegisterUser = () => {
  return (
    <>
<AuthSuccessPopup message="Account Created Successfully!" redirectPath="/" />

    <div className="bg-[url('/assets/sign-up-bg.jpg')] bg-cover flex flex-col justify-center items-center min-h-screen px-4 md:px-8">
      <h1 className="text-white shadow-md text-2xl sm:text-3xl lg:text-5xl font-bold text-center mb-5 mt-2 sm:mb-10">Create Your Account</h1>
      <div className="flex flex-col border-2 border-white rounded-xl p-7 mb-3 bg-[#262629] max-w-md md:w-[60%]">
        <h2 className="text-white text-center font-bold text-xl mb-5 break-all">Enter Your Credentials</h2>
        <UserForm />
        <div className="text-center text-gray-400 mt-2">
          Already have an account? <NavLink to="/user/login" className="text-sky-500 hover:underline">Login</NavLink>
        </div>
      </div>
    </div>
    </>
  );
};

export default RegisterUser;
