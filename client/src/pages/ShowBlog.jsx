import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHome } from "react-icons/fa";
import { GrArticle } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import Navbar from '../components/Navbars/Navbar/Navbar';
import Footer from "../components/Footer/Footer";
const ShowBlog = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/v1/navigate/blog/${id}`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setBlog(response.data.data.blogDetails);
        }
      } catch (error) {
        console.error("Blog data FAILED to fetch: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const deleteBlog = async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/v1/navigate/blog/${id}/delete`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        alert("Blog deleted successfully!");
        navigate("/all-blogs");
      }
    } catch (error) {
      console.error("Failed to delete Blog ", error);
    }
  };

  return (
    <>
          <div className='bg-gradient-to-r from-slate-600 to-slate-800'>
<Navbar/>
    </div>
    
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 px-4 py-10">
      {/* Loading Skeleton */}
      {loading ? (
        <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg animate-pulse">
          <div className="h-60 bg-gray-300 rounded-lg mb-4"></div>
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
      ) : blog ? (
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg shadow-gray-500 overflow-hidden transform transition-all duration-300 hover:scale-105">
          {/* Blog Image */}
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-64 object-cover"
          />

          {/* Blog Content */}
          <div className="p-6">
            <h1 className="text-xl xs:text-3xl font-bold text-gray-800 mb-4 flex justify-between items-center">
              {blog.title}
              <MdDeleteForever
                className="w-6 h-6 text-gray-500 hover:text-red-600 cursor-pointer transition-transform transform hover:scale-110"
                onClick={() => navigate(`/blog/${blog._id}/delete`)}
              />
            </h1>
            <p className="text-gray-600 text-base leading-relaxed">{blog.description}</p>
            <p className="text-gray-400 text-sm mt-2">Blog ID: {blog._id}</p>
          </div>
        </div>
      ) : (
        <p className="text-red-500 text-xl">Blog not found!</p>
      )}

      {/* Navigation Buttons */}
      <div className="flex flex-col xs:flex-row mt-8 gap-5 md:gap-10">
        
        <Link to="/all-blogs">
          <button className="flex items-center gap-2 px-6 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-md transition-all duration-300 hover:bg-green-700 active:scale-95">
            <GrArticle className="w-5 h-5" /> All Blogs
          </button>
        </Link>
        <Link to="/">
          <button className="flex items-center gap-2 px-9 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md transition-all duration-300 hover:bg-blue-700 active:scale-95">
            <FaHome className="w-5 h-5" /> Home
          </button>
        </Link>
      </div>
    </div>
    <div className='bg-gradient-to-r from-slate-600 to-slate-800'>
<Footer/>
    </div>
    </>
  );
};

export default ShowBlog;
