import React, { useEffect, useState } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router-dom';
const ContactUsLoader = () => {
    const [isLoading , setIsLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        setIsLoading(true);
        const timer = setTimeout( () => {
            setIsLoading(false);
            navigate('/');
        }, 3000)
        return () => {
            clearTimeout(timer)
        }
    } , [navigate])
  return (
    <>
    {isLoading ?
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-indigo-300 to-cyan-200">
  <DotLottieReact
    src="https://lottie.host/b2772656-e5ee-40a9-bc44-d8a6805808dd/tcsx0R6elb.lottie"
    autoplay
    className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80"
  />
  <span className="text-center text-2xl font-bold text-blue-600 animate-pulse sm:text-4xl ">
    Contact Sent Successfully
  </span>
</div>

  : null
}
    
    </>
  )
}


export default ContactUsLoader;





