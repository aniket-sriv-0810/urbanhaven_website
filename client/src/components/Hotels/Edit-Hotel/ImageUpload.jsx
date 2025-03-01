import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const ImageUpload = ({ setImage }) => {
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <label className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-400 rounded-lg p-4 cursor-pointer hover:bg-indigo-50 transition">
      <FaCloudUploadAlt className="text-3xl text-indigo-500" />
      <span className="text-gray-500 mt-2">Click to upload image</span>
      <input type="file" name="image" onChange={handleImageChange} className="hidden" />
    </label>
  );
};

export default ImageUpload;
