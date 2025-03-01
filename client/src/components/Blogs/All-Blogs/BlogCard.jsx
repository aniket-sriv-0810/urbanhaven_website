import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { useUser } from "../../userContext/userContext";

const BlogCard = ({ blog }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="bg-white w-full sm:w-68 xl:w-[80%] shadow-lg rounded-xl overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl border border-gray-200">
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
  );
};

export default BlogCard;
