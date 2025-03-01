import React from "react";
import ImageUpload from "./ImageUpload";

const EditForm = ({ hotelData, setHotelData, image, setImage, handleSubmit, loading }) => {
  const inputStyling = `w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none`;

  const handleChange = (e) => {
    setHotelData({ ...hotelData, [e.target.name]: e.target.value });
  };

  return (
    <>
       
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          value={hotelData.title}
          onChange={handleChange}
          placeholder="Title"
          className={inputStyling}
          required
        />
        <input
          type="number"
          name="price"
          value={hotelData.price}
          onChange={handleChange}
          placeholder="Price per night"
          className={inputStyling}
          required
        />
      </div>
      <textarea
        name="description"
        value={hotelData.description}
        onChange={handleChange}
        placeholder="Hotel Description"
        className={`${inputStyling} h-28`}
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          name="city"
          value={hotelData.city}
          onChange={handleChange}
          placeholder="City"
          className={inputStyling}
          required
        />
        <input
          type="text"
          name="state"
          value={hotelData.state}
          onChange={handleChange}
          placeholder="State"
          className={inputStyling}
          required
        />
        <input
          type="text"
          name="country"
          value={hotelData.country}
          onChange={handleChange}
          placeholder="Country"
          className={inputStyling}
          required
        />
      </div>
      <ImageUpload image={image} setImage={setImage} />
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
                  Updating Hotel Details...
                </>
              ) : (
                <>
                  Update Hotel Details
                  
                </>
              )}
            </button>
    </form>
    </>
  );
};

export default EditForm;
