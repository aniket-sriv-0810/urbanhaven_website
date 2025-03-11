import React ,{useState , useEffect}from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from "react-router-dom";

const AccountDelete = ({ message = "Successfully Deleted !", redirectPath = "/user/logout" }) =>  {

  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => navigate(redirectPath), 500); // Redirect after fade-out
    }, 4000); // Show for 4 seconds

    return () => clearTimeout(timer);
  }, [navigate, redirectPath]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gradient-to-t from-gray-800 to-red-600 bg-opacity-40 backdrop-blur-lg transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white p-5 sm:p-7 rounded-2xl shadow-xl text-center w-80 md:w-96 transition-transform transform ${
          isVisible ? "translate-y-0 scale-100" : "translate-y-10 scale-95 opacity-0"
        }`}
      >
        {/* Animated Success GIF */}
        <DotLottieReact
      src="https://lottie.host/181b3bd3-e95a-40f4-b156-1326b9d0a5e4/0P4Fh3UCbl.lottie"
      loop
      autoplay
      className='w-66 h-40 mb-10'
    />

        {/* Success Message - Ensuring visibility */}
        <h2 className="text-lg font-semibold text-black -mt-4">{message}</h2>
        <p className="text-sm text-gray-500">Redirecting you shortly...</p>

        {/* Animated Button */}
        <button
          className="mt-5 bg-gradient-to-t from-red-600 to-gray-500 text-white font-medium px-5 py-2 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          onClick={() => navigate("/")}
        >
          Go to Home →
        </button>
      </div>
    </div>
  );
};

export default AccountDelete;

