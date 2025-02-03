import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [newHotel, setNewHotel] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    state: "",
    country: "",
  });

  const handleInputChange = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    setNewHotel({ ...newHotel, [inputName]: inputValue });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newHotel.title);
    formData.append("description", newHotel.description);
    formData.append("price", newHotel.price);
    formData.append("city", newHotel.city);
    formData.append("state", newHotel.state);
    formData.append("country", newHotel.country);
    if (image) {
      formData.append("image", image);
    }
console.log([ ...formData]);

try {
  const response = await axios.post("http://localhost:8000/v1/admin/new-hotel", formData, 
    {
    withCredentials: true,
  });
  if (response.status === 200) {
    setNewHotel({
      title: "",
      description: "",
      price: "",
          city: "",
          state: "",
          country: "",
        });
        console.log("FormData sent: " + formData);
        setImage(null);
        setPreview(null);
        navigate("/admin");
      } else {
        console.error("Error occurred");
      }
    } catch (error) {
      console.error("Hotel Creation error: " + error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create a New Hotel
        </h1>
        <form onSubmit={handleSubmitForm} className="space-y-6">
          <input
            type="text"
            placeholder="Hotel Title"
            name="title"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newHotel.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            placeholder="Description"
            name="description"
            rows="4"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newHotel.description}
            onChange={handleInputChange}
            required
          ></textarea>
          <input
            type="number"
            placeholder="Price (per night)"
            name="price"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newHotel.price}
            onChange={handleInputChange}
            required
          />
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Hotel Image
            </label>
            <div
              className="relative w-full p-6 text-center border-2 border-dashed rounded-lg border-gray-300 bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
              onClick={() => document.getElementById("fileInput").click()}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-lg"
                />
              ) : (
                <p className="text-gray-500">
                  Drag & drop an image here, or <span className="text-blue-500 underline">browse</span>
                </p>
              )}
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            {image && (
              <p className="text-sm text-green-500 mt-2">
                {image.name} selected successfully!
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="City"
              name="city"
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newHotel.city}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              placeholder="State"
              name="state"
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newHotel.state}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              placeholder="Country"
              name="country"
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newHotel.country}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg shadow-md transition duration-300"
          >
            Create Hotel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
