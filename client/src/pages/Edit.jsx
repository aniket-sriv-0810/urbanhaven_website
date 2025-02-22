import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [hotelData, setHotelData] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    state: "",
    country: ""
  });
  const [image, setImage] = useState(null);
  const [orgImage, setOrgImg] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/v1/hotel/${id}`,
          { withCredentials: true }
        );
        setOrgImg(response.data.data.showHotel.image);
        setHotelData(response.data.data.showHotel);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };
    fetchHotel();
  }, [id]);

  const handleChange = (e) => {
    setHotelData({ ...hotelData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", hotelData.title);
    formData.append("description", hotelData.description);
    formData.append("price", hotelData.price);
    formData.append("city", hotelData.city);
    formData.append("state", hotelData.state);
    formData.append("country", hotelData.country);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.put(`http://localhost:8000/v1/admin/hotel-details/${id}/edit`, formData, {
        withCredentials: true,
      });
      navigate("/admin/hotels");
    } catch (error) {
      console.error("Error updating hotel:", error);
    }
  };
const inputStyling = `w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none`
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-xl xs:text-3xl font-semibold text-gray-700 mb-6 text-center">Edit Hotel Details</h1>
        {orgImage && (
          <div className="mb-4 flex justify-center">
            <img src={orgImage} alt={hotelData.title} className="w-full max-h-72 object-cover xs:object-contain rounded-xl shadow-md" />
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="title" value={hotelData.title} onChange={handleChange} placeholder="Title" className={inputStyling} required />
            <input type="number" name="price" value={hotelData.price} onChange={handleChange} placeholder="Price per night" className={inputStyling} required />
          </div>
          <textarea name="description" value={hotelData.description} onChange={handleChange} placeholder="Hotel Description" className={` ${inputStyling} h-28`} required />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" name="city" value={hotelData.city} onChange={handleChange} placeholder="City" className={inputStyling} required />
            <input type="text" name="state" value={hotelData.state} onChange={handleChange} placeholder="State" className={inputStyling} required />
            <input type="text" name="country" value={hotelData.country} onChange={handleChange} placeholder="Country" className={inputStyling} required />
          </div>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-400 rounded-lg p-4 cursor-pointer hover:bg-indigo-50 transition">
            <FaCloudUploadAlt className="text-3xl text-indigo-500" />
            <span className="text-gray-500 mt-2">Click to upload image</span>
            <input type="file" name="image" onChange={handleImageChange} className="hidden" />
          </label>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 transition">
            Update Hotel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
