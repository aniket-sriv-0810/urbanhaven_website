import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#d0d0ff] px-6 overflow-hidden">
      <div className="w-[80%] h-[50%]  ">
        <DotLottieReact
          src="https://lottie.host/75b5b431-d05c-4a40-85ed-7532a408c15b/LHAf2ivdT9.lottie"
          loop
          autoplay
        />
      </div>
      <div className='relative -top-10 sm:top-0 text-center -mt-4 '>
      <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-800 py-2 ">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 text-base sm:text-lg md:text-xl mt-2 ">
        Oops! The page you are looking for does not exist.
      </p>
      <button
        className="mt-6 px-6 py-3 bg-blue-600 text-white text-sm sm:text-base md:text-lg rounded-lg hover:bg-blue-700 transition-all duration-300"
        onClick={() => navigate('/')}
      >
        Go to Home
      </button>
      </div>
    </div>
  );
};

export default PageNotFound;
