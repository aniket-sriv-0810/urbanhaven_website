import React, { useEffect, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router-dom';

const ReviewLoader = () => {
  const [isLoading , setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    setIsLoading(true);
  const timer = setTimeout( ()=> {
    setIsLoading(false);
    const redirectPath = location.state?.from?.pathname || "/";
     navigate(redirectPath);
  } , 3000);
  return () => {clearTimeout(timer);}
  } , [navigate])
  return (
    <>
    {
      isLoading ?
      <div className='flex justify-center  items-center bg-yellow-100'>
      <DotLottieReact
      src="https://lottie.host/e080215c-f7c9-4975-89d8-8827b20e8374/lILbnOFwId.lottie"
      loop
      autoplay
      />
      </div> :
       null
    }
    </>
  );
};

export default ReviewLoader;