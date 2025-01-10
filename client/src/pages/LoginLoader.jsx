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
            const redirectPath = location.state?.from?.pathname || "/";
            navigate(redirectPath);
        }, 3000)
        return () => {
            clearTimeout(timer)
        }
    } , [navigate])
  return (
    <>
    {isLoading ?
        <>
        <div className="loading-page flex flex-col justify-center items-center h-screen  bg-green-300">
        <DotLottieReact
        src="https://lottie.host/b252713a-708e-4d91-ad15-5efe7981c816/lQGVg4AsxK.lottie"
        autoplay
        className=''
        />
        <span className='text-center text-2xl font-bold text-[#0a6607] relative -top-[30%] sm:text-4xl lg:-top-[20%] lg:text-5xl'>Logged in Successfully</span>
  </div>
  </>
  : null
}
    
    </>
  )
}

export default LoginLoader;

