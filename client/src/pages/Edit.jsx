import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

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
  const [orgImage , setOrgImg] = useState(null);
  // Fetch the current hotel data
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/hotel/${id}`
        );
        setOrgImg(response.data.showHotel.image);
        setHotelData(response.data.showHotel);
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
        `http://localhost:8000/api/v1/hotel/${id}/edit`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" }  }
      );

      console.log("Hotel updated:", response.data.updatedHotel);
      navigate('/')
    } catch (error) {
      console.error("Error updating hotel:", error);
    }
  };


  return (
    <>
    <img src={orgImage} alt={hotelData.title}/>
    <form
      onSubmit={handleSubmit}
       className="border-gray-500 border-2 w-max m-auto p-5 rounded-lg flex flex-col"
    >
      <h1>Edit Hotel</h1>
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={hotelData.title}
        onChange={handleChange}
         className="border-gray-500 border-2"
        required
      />
      <label>Description:</label>
      <textarea
        name="description"
        value={hotelData.description}
        onChange={handleChange}
         className="border-gray-500 border-2"
        required
      />
      <label>Price:</label>
      <input
        type="number"
        name="price"
        value={hotelData.price}
        onChange={handleChange}
         className="border-gray-500 border-2"
        required
      />
      <label>City:</label>
      <input
        type="text"
        name="city"
        value={hotelData.city}
        onChange={handleChange}
         className="border-gray-500 border-2"
        required
      />
      <label>State:</label>
      <input
        type="text"
        name="state"
        value={hotelData.state}
        onChange={handleChange}
         className="border-gray-500 border-2"
        required
      />
      <label>Country:</label>
      <input
        type="text"
        name="country"
        value={hotelData.country}
        onChange={handleChange}
         className="border-gray-500 border-2"
        required
      />
      <label>Image:</label>
      <input type="file" onChange={handleImageChange} name="image" />
      <button type="submit">Update Hotel</button>
    </form>
    </>
  );
};

export default Edit;
