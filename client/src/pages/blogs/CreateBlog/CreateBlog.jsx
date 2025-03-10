import React, { useState } from "react";
import axios from "axios";
import BlogForm from "../../../components/Blogs/Create-Blog/BlogForm";
import {useNavigate} from 'react-router-dom';
const CreateBlog = () => {
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();
  // Handle Form Submission
  const handleSubmit = async (formData, setFormData, setPreview) => {
    if (!formData.title || !formData.description || !formData.image) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    setLoading(true);
    const blogData = new FormData();
    Object.entries(formData).forEach(([key, value]) => blogData.append(key, value));

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/admin/add-blog`,
        blogData,
        { withCredentials: true }
      );
      navigate('/create/successfully')
      console.log(response.data);
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
    <>

      <div className="bg-gray-100 shadow-xl shadow-gray-400 rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-xl sm:text-3xl font-extrabold text-center text-gray-800 mb-6 animate-fadeIn">
          Create a New Blog
        </h2>
        <BlogForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </>
    </div>
  );
};

export default CreateBlog;
