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
        }, 8000)
        return () => {
            clearTimeout(timer)
        }
    } , [navigate])
  return (
    <>
    {isLoading ?
      <div className='flex justify-center items-center bg-sky-200'>
    <DotLottieReact
      src="https://lottie.host/7bafe8ae-1ba1-4878-822f-effd352aa591/Pnw4qmbGjs.lottie"
      loop
      autoplay
    />
    </div>
  : null
}
    
    </>
  )
}


export default ContactUsLoader;
