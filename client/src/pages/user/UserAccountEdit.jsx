import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../components/userContext/userContext";
import UserProfileImage from "../../components/User/UserAccountEdit/UserProfileImage";
import UserAccountForm from "../../components/User/UserAccountEdit/UserAccountForm";
import SkeletonForm from "../../components/LoadingSkeleton/SkeletonForm";
import ErrorPopup from "../../components/PopUps/ErrorPopup/ErrorPopup";
const UserAccountEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [error , setError] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
  });

  const [image, setImage] = useState(null);
  const [orgImage, setOrgImg] = useState("");
  const [loading, setLoading] = useState(true); // Start with loading
  const [isLoading , setIsLoading] = useState(false);
  const [editError , setEditError] = useState("");
  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true); // Start loading before fetching data
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/v1/user/${id}/account`,
           {
          withCredentials: true,
        }
      );

        const fetchedUser = response.data.data.userInfo;
        
        // Set user data only after fetching
        setUserData({
          name: fetchedUser.name,
          username: fetchedUser.username,
          phone: fetchedUser.phone,
          email: fetchedUser.email,
          password : fetchedUser.password,
        });
        setOrgImg(fetchedUser.image);
      } catch (error) {
        setEditError("Failed to display user details ! Please try again later");
        setLoading(false);
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    };

    fetchUser();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Handle image upload preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setOrgImg(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(userData).forEach(([key, value]) => formData.append(key, value));
    if (image) formData.append("image", image);

    try {
      setIsLoading(true);
      await axios.put(`${import.meta.env.VITE_API_URL}/v1/user/${id}/account/edit`, formData, {
        withCredentials: true,
      });

      navigate(`/user/${id}/account`);
    } catch (error) {
      setEditError("Failed to Edit details ! Please try again later")
      setIsLoading(false);
    }
  };

  return (
    <>
    <div className="text-center">
    {editError && <ErrorPopup message={editError} onClose={() => editError("")} />}
    </div>
      {loading ? (
        <div className="mt-10 flex justify-center items-center">
        <SkeletonForm />
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-gray-400 to-zinc-500 flex items-center justify-center py-10 px-6 sm:px-8">
          <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-center">
              <h1 className="text-3xl font-bold text-white">Edit Profile</h1>
              <p className="text-gray-200 text-sm mt-2">
                Update your account details to keep everything up to date
              </p>
            </div>

            <UserProfileImage orgImage={orgImage} handleImageChange={handleImageChange} />
            <UserAccountForm userData={userData} handleChange={handleChange} handleSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </div>
      )}
    </>
  );
};

export default UserAccountEdit;
