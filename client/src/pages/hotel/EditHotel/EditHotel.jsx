import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import EditForm from "../../../components/Hotels/Edit-Hotel/EditForm";
import ErrorPopup from "../../../components/PopUps/ErrorPopup/ErrorPopup";
const EditHotel = () => {
  const navigate = useNavigate();
  const { id } = useParams();
   const [loading, setLoading] = useState(false);
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
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/v1/hotel/${id}`,
          { withCredentials: true }
        );
        setOrgImg(response.data.data.showHotel.image);
        setHotelData(response.data.data.showHotel);
      } catch (error) {
        console.error("Error updating hotel:", error);
    setError(error.response?.data?.message || "Failed to fetch hotel details");
    setLoading(false);
      }
    };
    fetchHotel();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.keys(hotelData).forEach((key) => formData.append(key, hotelData[key]));
    if (image) formData.append("image", image);



    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/v1/admin/hotel-details/${id}/edit`, formData, {
        withCredentials: true,
      });
      setLoading(false);
      navigate("/edit/successfully");
      
    } catch (error) {
      console.error("Error updating hotel:", error);
      setError(error.response?.data?.message || "Failed to update hotel details");
      setLoading(false);
      setSuccess(false);

    }
  };

  return (
    <>
{error && <ErrorPopup message={error} onClose={() => setError("")} />}

    <div className="sm:p-4 min-h-screen flex items-center justify-center rounded-lg bg-gradient-to-r from-slate-300 to-gray-300">
      <div className="w-full max-w-3xl bg-white shadow-lg shadow-gray-700 rounded-2xl p-8">
        <h1 className="text-xl xs:text-3xl font-semibold text-gray-700 mb-6 text-center">
          Edit Hotel Details
        </h1>
        {orgImage && (
          <div className="mb-4 flex justify-center">
            <img
              src={orgImage}
              alt={hotelData.title}
              className="w-full max-h-72 object-cover xs:object-contain rounded-xl shadow-md"
            />
          </div>
        )}
        <EditForm
          hotelData={hotelData}
          setHotelData={setHotelData}
          image={image}
          setImage={setImage}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>

    </>
  );
};

export default EditHotel;
