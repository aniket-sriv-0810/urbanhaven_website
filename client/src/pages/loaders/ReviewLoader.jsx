import React, { useEffect, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate, useLocation } from 'react-router-dom';

const ReviewLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Fix: Get location to access state

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      const redirectPath = location.state?.from?.pathname || "/"; // ✅ Fix: Proper access
      navigate(redirectPath);
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate, location]); // ✅ Fix: Added location to dependencies

  return (
    <>
      {isLoading && ( // ✅ Fix: Proper conditional rendering
        <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-t from-gray-200 to-yellow-300 px-6 overflow-hidden">
        <div className='shadow-sm shadow-gray-200 rounded-full'>
          <DotLottieReact
            src="https://lottie.host/e080215c-f7c9-4975-89d8-8827b20e8374/lILbnOFwId.lottie"
            autoplay
            className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80"
          />
        </div>
          <div className="relative -top-10 sm:top-0 text-center -mt-4">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-700 animate-pulse py-2">
              Review Created Successfully 
            </h1>
            
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewLoader;
