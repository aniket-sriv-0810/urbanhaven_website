import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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

  // Fetch the current hotel data
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/hotel/${id}`,
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

  // Handle input change
  const handleChange = (e) => {
    setHotelData({ ...hotelData, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
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
      const response = await axios.put(
        `http://localhost:8000/api/v1/admin/hotel-details/${id}/edit`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log("Hotel updated:", response.data.data.updatedHotel);
      navigate("/admin/hotels");
    } catch (error) {
      console.error("Error updating hotel:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edit Hotel Details
        </h1>
        {orgImage && (
          <div className="mb-4">
            <img
              src={orgImage}
              alt={hotelData.title}
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={hotelData.title}
                onChange={handleChange}
                placeholder="Hotel Title"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={hotelData.price}
                onChange={handleChange}
                placeholder="Price per night"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={hotelData.description}
              onChange={handleChange}
              placeholder="Write a brief description of the hotel..."
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                value={hotelData.city}
                onChange={handleChange}
                placeholder="City"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                name="state"
                id="state"
                value={hotelData.state}
                onChange={handleChange}
                placeholder="State"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                name="country"
                id="country"
                value={hotelData.country}
                onChange={handleChange}
                placeholder="Country"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Hotel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
