import React, { useEffect } from "react";
import LoginForm from "./LoginForm";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
const LoginUser = () => {

    useEffect(() => {
        AOS.init({
          offset: 60, // Start animation after scrolling 100px
          duration: 1500, // Animation duration
          easing: "ease-in-out", // Smooth effect
          mirror:true,
          once: false, // Animation repeats on scroll
        });
      }, []);
  return (
    <>
      <div className="bg-[url('/assets/sign-up-bg.jpg')] bg-cover flex flex-col justify-center items-center bg-purple-200 min-h-screen px-4 md:px-8">
        <h1 className="text-white text-2xl sm:text-3xl lg:text-5xl shadow-md font-semibold text-center mb-7 mt-2 md:-mt-4 md:mb-9" data-aos="fade-down">
          Log in to your Account
        </h1>
        <div className="flex flex-col border-2 border-white rounded-xl p-10 bg-[#212521] max-w-md md:w-[65%]" data-aos="fade-down">
          <h2 className="text-white text-center font-bold text-lg mb-5">
            Verify Your Credentials
          </h2>
          <LoginForm  />
        </div>
      </div>
    </>
  );
};

export default LoginUser;
