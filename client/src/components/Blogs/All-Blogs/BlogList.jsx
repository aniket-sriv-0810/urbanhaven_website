import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";
import SkeletonList from "../../LoadingSkeleton/SkeletonList";
import Pagination from "../../Pagination/Pagination"; // Import Pagination Component

const BlogList = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);


  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Change this as needed

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/v1/navigate/all-blogs`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setBlogData(response.data.data.allBlogs);
        }
      } catch (err) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <h1 className="flex flex-col lg:flex-row justify-center items-center mt-10"><SkeletonList /></h1>

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = blogData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(blogData.length / itemsPerPage);

  return (
    <>
    <div className="m-auto py-20 px-8 bg-gray-100">
      <h1 className="text-2xl mb-12 sm:text-4xl font-extrabold text-center text-gray-800  tracking-wide">
        Our Blogs
      </h1>

      {blogData.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No blogs available.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {currentBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>

          {/* Pagination Component */}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={setCurrentPage}
          />
        </>
      )}
    </div>
    </>
  );
};

export default BlogList;
