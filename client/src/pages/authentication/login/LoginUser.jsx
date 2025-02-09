import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "./LoginForm";

const LoginUser = () => {
  return (
    <div className="bg-[url('/assets/sign-up-bg.jpg')] bg-cover flex flex-col justify-center items-center bg-purple-200 min-h-screen px-4 md:px-8">
      <h1 className="text-white text-2xl sm:text-4xl shadow-md font-semibold text-center mb-5 mt-2  md:-mt-4 md:mb-9">
        Log in to your Account
      </h1>
      <div className="flex flex-col border-2 border-white rounded-xl p-10 bg-[#212521] max-w-md md:w-[65%]">
        <h2 className="text-white text-center font-bold text-lg mb-5">
          Verify Your Credentials
        </h2>
        <LoginForm />
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginUser;
