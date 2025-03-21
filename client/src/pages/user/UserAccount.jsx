import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import UserNavbar from "../../components/Navbars/UserNavbar/UserNavbar";
import UserProfile from "../../components/User/UserAccount/UserProfile";
import UserDetailsForm from "../../components/User/UserAccount/UserDetailsForm";
import UserActions from "../../components/User/UserAccount/UserActions";
import SkeletonForm from "../../components/LoadingSkeleton/SkeletonForm";
import ErrorPopup from "../../components/PopUps/ErrorPopup/ErrorPopup";
const UserAccount = () => {
  const [showUser, setShowUser] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true); // Initially set loading to true
  const navigate = useNavigate();
  const [error , setError] = useState("");
  const userDetails = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/v1/user/${id}/account`,
        { withCredentials: true }
      );
      setShowUser(response.data.data.userInfo);
    } catch (error) {
      setError("Error in fetching user details");
    } finally {
      setLoading(false); // Ensure loading is set to false after request is complete
    }
  };

  useEffect(() => {
    userDetails();
  }, [id]);

    useEffect(() => {
      AOS.init({
        offset: 60, // Start animation after scrolling 100px
        duration: 1500, // Animation duration
        easing: "ease-in-out", // Smooth effect
        mirror:true,
        once: false, // Animation repeats on scroll
      });
    }, []);

  return (
    <>
      <UserNavbar />
   <div className="text-center ">
    {error && <ErrorPopup message={error} onClose={() => setError("")} />} 
   </div>  
      {loading ? (
        <div className="flex justify-center items-center mt-10">
        <SkeletonForm />
        </div>
      ) : (
        <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row">
          {/* Sidebar - User Profile */}
          
          <UserProfile user={showUser} />
          

          {/* Main Content */}
          <div className="flex-1 bg-white p-6 md:p-12">
            {showUser ? (
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  My Account
                </h2>

                {/* User Details Form */}
                <UserDetailsForm user={showUser} />

                {/* Action Buttons */}
                <UserActions navigate={navigate} />
              </div>
            ) : (
              <p className="text-gray-500 text-lg text-center">User details not found.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserAccount;
