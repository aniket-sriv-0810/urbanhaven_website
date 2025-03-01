import React , {useState , useEffect}from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate, useLocation } from 'react-router-dom';
const BookingLoader = () => {
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
            <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-t from-green-100 to-green-400 px-6 overflow-hidden">
            <DotLottieReact
      src="https://lottie.host/13321896-ad1e-4e32-90d0-9199df2ae461/j2JTSB5GHF.lottie"
      loop
      autoplay
      className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80"
    />
            
              <div className="relative -top-10 sm:top-0 text-center -mt-4">
                <h1 className="text-xl sm:text-3xl md:text-3xl font-bold text-green-600 animate-pulse py-2">
                  Booking confirmed Successfully 
                </h1>
                
              </div>
            </div>
          )}
          </>
  );
};

export default BookingLoader;