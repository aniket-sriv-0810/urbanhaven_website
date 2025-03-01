import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { useUser } from "../../components/userContext/userContext";

const UserAccountEdit = () => {
  const {user} = useUser();
   const navigate = useNavigate();
    const { id } = useParams();
    const [userData, setUserData] = useState({
     name:user.name,
     username:user.username,
     phone:user.phone,
     email:user.email,
    });
    const [image, setImage] = useState(null);
    const [orgImage , setOrgImg] = useState(user.image);

  // Fetch the current user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/v1/user/${id}/account`,{
            withCredentials:true,
          },
        );
        console.log("edit =>" , response.data);
        
        setOrgImg(response.data.data.userInfo.image);
        setUserData(response.data.data.userInfo);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    fetchUser();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("username", userData.username);
      formData.append("phone", userData.phone);
      formData.append("email", userData.email);

      if (image) {
        formData.append("image", image);
      }
  
      try {
        const response = await axios.put(
          `http://localhost:8000/v1/user/${id}/account/edit`,
          formData,{
            withCredentials:true,
          },
        );
  
        console.log("user updated:", response.data.data.updatedUser);
        navigate(`/user/${id}/account`)
      } catch (error) {
        console.error("Error updating user:", error);
      }
    };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center py-10 px-6 sm:px-8">
    <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-center">
        <h1 className="text-3xl font-bold text-white">Edit Profile</h1>
        <p className="text-gray-200 text-sm mt-2">Update your account details to keep everything up to date</p>
      </div>

      {/* Profile Image */}
      <div className="flex flex-col items-center mt-6">
        <img
          src={orgImage}
          alt={userData.name}
          className="w-32 h-32 rounded-full border-4 border-indigo-600 shadow-lg object-cover"
        />
        <label className="mt-3 text-sm font-medium text-gray-600">Change Profile Picture</label>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          className="mt-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
        />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={userData.name}
            onChange={handleChange}
            required
            className="mt-2 block w-full text-black rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
          />
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={userData.username}
            onChange={handleChange}
            required
            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="number"
            name="phone"
            id="phone"
            value={userData.phone}
            onChange={handleChange}
            required
            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={userData.email}
            onChange={handleChange}
            required
            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 px-6 text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-md text-lg font-medium hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save Changes
        </button>
      </form>
    </div>
  </div>
  )
}

export default UserAccountEdit
