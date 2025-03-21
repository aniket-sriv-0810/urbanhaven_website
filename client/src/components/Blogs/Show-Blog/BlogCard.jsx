import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { useUser } from "../../userContext/userContext";
const BlogCard = ({ blog, navigate }) => {
  const {user} = useUser();
  return (
    <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg shadow-gray-500 overflow-hidden transform transition-all duration-300 hover:scale-105">
      {/* Blog Image */}
      <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover" />

      {/* Blog Content */}
      <div className="p-6">
        <h1 className="text-xl xs:text-3xl font-bold text-gray-800 mb-4 flex justify-between items-center">
          {blog.title}
          { user ? user.role === "admin" ?
          <MdDeleteForever
            className="w-6 h-6 text-gray-500 hover:text-red-600 cursor-pointer transition-transform transform hover:scale-110"
            onClick={() => navigate(`/blog/${blog._id}/delete`)}
          /> :
          null
          :
          null
          }
        </h1>
        <p className="text-gray-600 text-base leading-relaxed">{blog.description}</p>
      </div>
    </div>
  );
};

export default BlogCard;
