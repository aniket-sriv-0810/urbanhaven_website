import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { useUser } from "../components/userContext/userContext";
import Navbar from '../components/Navbars/Navbar/Navbar';
import Footer from "../components/Footer/Footer";
const AllBlogs = () => {
  const [blogData, setBlogData] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/v1/navigate/all-blogs", {
          withCredentials: true,
        });

        if (response.status === 200) {
          setBlogData(response.data.data.allBlogs);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center text-lg font-semibold mt-10">Loading Blogs...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <>
    <div className='bg-gradient-to-r from-slate-600 to-slate-800'>
<Navbar/>
    </div>
    
    <div className="m-auto mb-10 mt-10 p-6 bg-gray-200">
      <h1 className="text-2xl sm:text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-wide">
        Tour & Travel Blogs
      </h1>

      {blogData.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No blogs available.</p>
      ) : (
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.map((blog) => (
            <div
              key={blog._id}
              className="bg-white w-full sm:w-68 xl:w-[80%] shadow-lg rounded-xl overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl border border-gray-200"
            >
              {/* Blog Image */}
              <img
                src={blog.image}
                alt="Blog"
                className="w-full h-56 object-cover transition-opacity duration-300 hover:opacity-90"
              />

              {/* Blog Content */}
              <div className="p-5">
                <h2 className="flex items-center justify-between text-xl font-bold text-gray-900">
                  {blog.title}
                  {user?.role === "admin" && (
                    <Link to={`/blog/${blog._id}/edit`} className="ml-3">
                      <FaRegEdit className="w-5 h-5 text-gray-400 hover:text-green-600 transition" />
                    </Link>
                  )}
                </h2>

                <p className="text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                  {blog.description}
                </p>

                {/* Read More Button */}
                <button
                  className="mt-4 w-full bg-gradient-to-r from-teal-600 to-green-500 text-white px-5 py-2 rounded-lg font-medium transition-transform transform hover:scale-105 hover:shadow-md"
                  onClick={() => navigate(`/blog/${blog._id}`)}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    <div className='bg-gradient-to-r from-slate-600 to-slate-800'>
<Footer/>
    </div>
    </>
  );
};

export default AllBlogs;
