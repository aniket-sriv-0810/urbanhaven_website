import React, { useEffect, useState } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router-dom';
const AuthLoader = () => {
    const [isLoading , setIsLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        setIsLoading(true);
        const timer = setTimeout( () => {
            setIsLoading(false);
            navigate('/')
        }, 2000)
        return () => {
            clearTimeout(timer)
        }
    } , [navigate])
  return (
    <>
    {isLoading ?
        <div className="loading-page flex justify-center items-center h-screen bg-emerald-300">
    <DotLottieReact
    src="https://lottie.host/4792597a-d49c-4626-934c-c336b045bd5a/tJ1eVDVlhs.lottie"
    autoplay
    className="w-40 h-40"
  />
  </div>
 : null
    }

    </>
  )
}

export default AuthLoader

