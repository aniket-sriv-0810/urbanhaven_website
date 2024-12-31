import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For page redirection
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Loading = ({ redirectTo }) => {
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate(redirectTo); // Redirect to the page passed as a prop
    }, 3000);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate, redirectTo]);

  return (
    <div className="loading-page flex justify-center items-center h-screen bg-gray-100">
      <DotLottieReact
        src="https://lottie.host/557cc392-d4bc-4150-9de9-9346ca1653fe/rfhjC5Z1C6.lottie"
        loop
        autoplay
        className="w-40 h-40"
      />
    </div>
  );
};

export default Loading;
