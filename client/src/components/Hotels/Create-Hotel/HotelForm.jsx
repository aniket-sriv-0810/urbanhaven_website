import React, { useState } from "react";
import { IoIosHome } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FileUpload from "./FileUpload";
import SuccessPopup from "../../PopUps/SuccessPopup/SuccessPopup";
const HotelForm = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hotelData, setHotelData] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    state: "",
    country: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setHotelData({ ...hotelData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading before making the request

    const formData = new FormData();
    Object.keys(hotelData).forEach((key) => formData.append(key, hotelData[key]));
    if (image) formData.append("image", image);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/admin/new-hotel`,
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setHotelData({ title: "", description: "", price: "", city: "", state: "", country: "" });
        setImage(null);
        setPreview(null);
        setLoading(false); // Stop loading after successful submission
        navigate("/admin");
        setSuccess(true); // Show the success popup
        setTimeout(() => {
          setSuccess(false);
          navigate("/admin");
        }, 3000);

      }
    } catch (error) {
      console.error("Hotel Creation Error:", error);
      setLoading(false); // Stop loading even if there is an error
    }
  };

  return (
    <>

    
    {success && <SuccessPopup message="Hotel Successfully Created!" onClose={() => setSuccess(false)} />}
      
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="text"
        placeholder="Hotel Title"
        name="title"
        className="w-full p-3 text-center border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={hotelData.title}
        onChange={handleChange}
        required
      />
      <textarea
        placeholder="Description"
        name="description"
        rows="4"
        className="w-full p-3 text-center border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={hotelData.description}
        onChange={handleChange}
        required
      ></textarea>
      <input
        type="number"
        placeholder="Price (per night)"
        name="price"
        className="w-full p-3 text-center border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={hotelData.price}
        onChange={handleChange}
        required
      />

      {/* File Upload Component */}
      <FileUpload image={image} setImage={setImage} preview={preview} setPreview={setPreview} />

      {/* Location Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {["city", "state", "country"].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            name={field}
            className="p-3 border border-gray-400 text-center rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={hotelData[field]}
            onChange={handleChange}
            required
          />
        ))}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full border-gray-500 border-2 font-semibold px-4 py-2 text-white rounded-xl mt-4 ${
          loading ? "bg-gradient-to-r from-blue-600 to-purple-600 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-purple-600"
        } flex items-center justify-center gap-2`}
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Creating Hotel...  
          </>
        ) : (
          <>
            Create Hotel
            <IoIosHome className="text-xl" />
          </>
        )}
      </button>
    </form>
    </>
  );
};

export default HotelForm;
