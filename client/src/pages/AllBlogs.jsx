import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate , Link, useParams } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { useUser } from "../components/userContext/userContext";

const AllBlogs = () => {
  const [blogData, setBlogData] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {user} = useUser();
  const {id} = useParams();
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/v1/navigate/all-blogs", {
        withCredentials: true,
      });
      console.log(response.data.data.allBlogs);

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

  useEffect(() => {
    fetchData();
  }, []);



  if (loading) return <p className="text-center text-lg font-semibold mt-10">Loading Blogs...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Tour & Travel Blogs
      </h1>

      {blogData.length === 0 ? (
        <p className="text-center text-gray-500">No blogs available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogData.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            >
            
              <img
                src={blog.image}
                alt="Blog"
                className="w-full h-60 object-cover"
              />
              
              <div className="p-4">
                <h2 className="flex items-center justify-between text-xl font-bold text-gray-900">{blog.title}
                {user.role === "admin"  ?
                <div className="flex gap-3 items-center">
                <Link to={`/blog/${blog._id}/edit`}>
                 <FaRegEdit className="w-4 h-4 m-2 text-gray-400 hover:scale-110 hover:text-green-600 hover:cursor-pointer" />
                 </Link>
                 </div>
                : null}
                 </h2>
                <p className="text-gray-600 mt-2 line-clamp-3">
                  {blog.description}
                </p>
                <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition" onClick={() => navigate(`/blog/${blog._id}`)} >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
