import React, { useEffect, useState } from "react";
import { useParams , Link } from "react-router-dom";
import axios from "axios";
import { FaHome } from "react-icons/fa";
import { GrArticle } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
const ShowBlog = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/v1/navigate/blog/${id}`,
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

  useEffect(() => {
    fetchData();
  }, []);

  const deleteBlog = async() => {
    try {
     const response = await axios.delete(`http://localhost:8000/v1/navigate/blog/${id}/delete`,
       {withCredentials: true});
    
       if(response.status == 200 ){
        alert("Blog deleted successfully !")
       }
    } catch (error) {
     console.error("Failed to delete Blog " , error);
    }
   }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-200 px-4">
      {loading ? (
        <div className="w-full max-w-4xl p-6 bg-white  rounded-lg shadow-lg  animate-pulse">
          <div className="h-60 bg-gray-300 rounded-lg mb-4"></div>
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
      ) : blog ? (
        <div className="w-full max-w-3xl mb-10 bg-white rounded-lg shadow-lg shadow-gray-500 overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-60 object-cover"
          />
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{blog.title}
            <Link to={`/blog/${blog._id}/delete`}>
                 <MdDeleteForever className="w-4 h-4 m-2 text-gray-400 hover:scale-110 hover:text-red-600 hover:cursor-pointer" onClick={deleteBlog} />
                 </Link></h1>
                 <p>Blog ID : {blog._id}</p>
            <p className="text-gray-600 text-base" >{blog.description}</p>
          </div>
        </div>
      ) : (
        <p className="text-red-500 text-xl">Blog not found!</p>
      )}
      <div className="flex flex-col md:flex-row mb-10 gap-5 md:gap-10">
      <Link to="/">
      <button className="flex items-center gap-2 px-5 py-2 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md transition-all duration-300 hover:bg-blue-700 active:scale-95" >
      <FaHome className="w-5 h-5" /> {/* Home Icon */}
      Home
    </button>
    </Link>
    <Link to="/all-blogs">
      <button className="flex items-center gap-2 px-5 py-2 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-md transition-all duration-300 hover:bg-green-700 active:scale-95">
      <GrArticle className="w-5 h-5" /> {/* Home Icon */}
      All Blogs
    </button>
    </Link>
    </div>
    </div>
  );
};

export default ShowBlog;
