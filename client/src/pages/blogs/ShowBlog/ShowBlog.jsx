import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../components/Navbars/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import BlogCard from "../../../components/Blogs/Show-Blog/BlogCard";


const ShowBlog = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 px-4 py-10">
        {loading ? (
          <h1>loading...</h1>
        ) : blog ? (
          <BlogCard blog={blog} navigate={navigate} />
        ) : (
          <p className="text-red-500 text-xl">Blog not found!</p>
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-col xs:flex-row mt-8 gap-5 md:gap-10">
          <Link to="/all-blogs">
            <button className="flex items-center gap-2 px-6 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-md transition-all duration-300 hover:bg-green-700 active:scale-95">
              All Blogs
            </button>
          </Link>
          <Link to="/">
            <button className="flex items-center gap-2 px-9 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md transition-all duration-300 hover:bg-blue-700 active:scale-95">
              Home
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
