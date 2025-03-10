import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BlogForm from "../../../components/Blogs/Edit-Blog/BlogForm";
import AdminNavbar from "../../../components/Navbars/AdminNavbar/AdminNavbar";
import SkeletonForm from "../../../components/LoadingSkeleton/SkeletonForm";
const EditBlog = () => {
  const [loading, setLoading] = useState(false);
  const [blogData, setBlogData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(true);
  // Fetch Blog Data
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/v1/navigate/blog/${id}`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setBlogData(response.data.data.blogDetails);
          setPageLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch data!", error);
      }
    };

    fetchBlogData();
  }, [id]);

  // Handle Form Submission
  const handleSubmit = async (formData) => {
    if (!formData.title || !formData.description || !formData.image) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    setLoading(true);
    const blogData = new FormData();
    Object.entries(formData).forEach(([key, value]) => blogData.append(key, value));

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/v1/admin/blog/${id}/edit`,
        blogData,
        { withCredentials: true }
      );

      if (response.status === 200) {
       navigate('/edit/successfully')
      }
    } catch (error) {
      console.error(error);
      alert("Error updating blog.");
    }

    setLoading(false);
  };

  return (
    <>
        <AdminNavbar/>
    {
      pageLoading ?
      (
        <div className="flex items-center justify-center"><SkeletonForm/></div>
      )
      :
      (
        <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-200 to-gray-200 px-4 py-10">
      <div className="bg-gray-100 shadow-xl shadow-gray-400 rounded-2xl p-8 w-full max-w-lg">
        {/* Back Button */}
        <button
          className="flex items-center gap-2 text-gray-700 hover:text-red-600 mb-4"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h2 className="text-xl sm:text-3xl font-extrabold text-center text-gray-800 mb-6 animate-fadeIn">
          Edit Blog
        </h2>

        {/* Blog Form with Loaded Data */}
        {blogData ? (
          <BlogForm onSubmit={handleSubmit} initialData={blogData} loading={loading} isEditing={true} />
        ) : (
          <p className="text-center text-gray-500">Loading blog details...</p>
        )}
      </div>
    </div>
    </>
      )
}
</>
  );
};

export default EditBlog;
