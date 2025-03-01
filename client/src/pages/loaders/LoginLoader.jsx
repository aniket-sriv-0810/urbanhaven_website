import React, { useEffect, useState } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router-dom';
const LoginLoader = () => {
    const [isLoading , setIsLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        setIsLoading(true);
        const timer = setTimeout( () => {
            setIsLoading(false);
            navigate("/");
        }, 4000)
        return () => {
            clearTimeout(timer)
        }
    } , [navigate])
  return (
    <>
    {isLoading ?
        <>
        <div className=" flex flex-col justify-center items-center h-screen bg-green-600">
        <DotLottieReact
        src="https://lottie.host/b252713a-708e-4d91-ad15-5efe7981c816/lQGVg4AsxK.lottie"
        autoplay
        />
        <span className='text-center text-2xl font-bold text-[#6de28f] animate-pulse relative sm:-top-[20%] sm:text-4xl lg:-top-[20%] lg:text-5xl'>Logged in Successfully</span>
  </div>
  </>
  : null
}
    
    </>
  )
}

export default LoginLoader;

