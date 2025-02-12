import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


const EditBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch Blog Data
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/v1/navigate/blog/${id}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        const { title, description, image } = response.data.data.blogDetails;
        setFormData({ title, description, image });
        setPreview(image); // Set preview to existing image
      }
    } catch (error) {
      console.error("Failed to fetch data!", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      const response = await axios.put(
        `http://localhost:8000/v1/navigate/blog/${id}/edit`,
        blogData,
        { withCredentials: true }
      );
      if (response.status === 200) {
        alert("Blog Updated Successfully!");
        navigate(`/blog/${id}`); // Redirect to blog page
      }
    } catch (error) {
      console.error(error);
      alert("Error updating blog.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
        
        {/* Back Button */}
        <button 
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 mb-4"
          onClick={() => navigate(-1)}
        >
           Back
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Edit the Blog Details
        </h2>

        {/* Existing Image Preview */}
        {preview && (
          <div className="mb-4 flex justify-center">
            <img
              src={preview}
              alt="Blog Preview"
              className="w-60 h-40 object-cover rounded-lg shadow-md"
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Title Input */}
          <div>
            <label className="block text-gray-700 font-medium">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter blog title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <p className="text-sm text-gray-500">{formData.title.length}/100</p>
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea
              name="description"
              rows="4"
              placeholder="Enter blog description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></textarea>
            <p className="text-sm text-gray-500">{formData.description.length}/500</p>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 mt-4 flex items-center justify-center text-white rounded-lg shadow-md ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "loading..." : "Update Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
