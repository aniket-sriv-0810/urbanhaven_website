import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GrArticle } from "react-icons/gr";
import { FaHome } from "react-icons/fa";
import Navbar from "../../../components/Navbars/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import BlogCard from "../../../components/Blogs/Show-Blog/BlogCard";
import SkeletonCard from "../../../components/LoadingSkeleton/SkeletonCard";
import ErrorPopup from "../../../components/PopUps/ErrorPopup/ErrorPopup";

const ShowBlog = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error , setError ] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/v1/navigate/blog/${id}`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setBlog(response.data.data.blogDetails);
        }
      } catch (error) {
        console.error("Blog data FAILED to fetch: ", error);
        setError(error.response?.data?.message || "Failed to display blog details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <div className="bg-gradient-to-r from-slate-600 to-slate-800">
        <Navbar />
      </div>
      {error && <ErrorPopup message={error} onClose={() => setError("")} />}
      <div className=" min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 px-4 py-20">
        {loading ? (
          <div className="flex flex-col justify-center items-center"><SkeletonCard/></div>
        ) : blog ? (
          <div className="flex flex-col justify-center items-center">
          <BlogCard blog={blog} navigate={navigate} />
          </div>
        ) : (
          <p className="text-red-500 text-xl text-center">Blog not found!</p>
          
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-col justify-center gap-6 items-center xs:flex-row mt-8 xs:gap-8 md:gap-10">
          <Link to="/all-blogs">
            <button className="flex items-center gap-3 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-t from-green-500 to-emerald-900 rounded-lg shadow-md transition-all duration-300 hover:scale-110 active:scale-95">
             <GrArticle/> All Blogs
            </button>
          </Link>
          <Link to="/">
            <button className="flex items-center gap-3 px-9 py-3 text-lg font-semibold text-white bg-gradient-to-t from-purple-600 to-blue-600 rounded-lg shadow-md transition-all duration-300 hover:scale-110 active:scale-95">
             <FaHome/> Home
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-gradient-to-r from-slate-600 to-slate-800">
        <Footer />
      </div>
    </>
  );
};

export default ShowBlog;
