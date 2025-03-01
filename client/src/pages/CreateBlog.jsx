import React, { useState } from "react";
import axios from "axios";

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Image Upload & Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.image) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    setLoading(true);
    const blogData = new FormData();
    blogData.append("title", formData.title);
    blogData.append("description", formData.description);
    blogData.append("image", formData.image);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/navigate/add-blog`, // Update with your backend API
        blogData,
        { withCredentials: true } ,

      );

      console.log(response.data);
      alert("Blog Created Successfully!");
      setFormData({ title: "", description: "", image: "" });
      setPreview(null);
    } catch (error) {
      console.error(error);
      alert("Error creating blog.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-200 to-gray-200 px-4 py-10">
    <div className="bg-gray-100 shadow-xl rounded-2xl p-8 w-full max-w-lg">
      <h2 className="text-xl sm:text-3xl font-extrabold text-center text-gray-800 mb-6 animate-fadeIn">
        Create a New Blog
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title Input */}
        <div>
          <label className="block text-gray-700 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter blog title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            required
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-gray-700 font-semibold">Description</label>
          <textarea
            name="description"
            rows="4"
            placeholder="Enter blog description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            required
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-semibold">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 mt-2 border border-gray-400 rounded-lg hover:cursor-pointer focus:outline-none"
            required
          />
        </div>

        {/* Image Preview */}
        {preview && (
          <div className="mt-4 rounded-lg overflow-hidden shadow-md">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover transform hover:scale-105  transition duration-500 "
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full p-2 mt-4 text-white rounded-xl shadow-md font-bold text-lg transition transform hover:scale-105 ${
            loading ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-blue-700 cursor-not-allowed" : "bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? 
            <>
            <span className="animate-pulse font-semibold  text-white flex justify-center items-center gap-3" >
            <div className="w-5 h-5  border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Creating Blog...
           </span>
          </>
          : "Create Blog"}
        </button>
      </form>
    </div>
  </div>
  );
};

export default CreateBlog;
