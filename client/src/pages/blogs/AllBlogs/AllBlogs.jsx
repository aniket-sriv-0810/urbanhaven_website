import React from "react";
import Navbar from "../../../components/Navbars/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import BlogList from "../../../components/Blogs/All-Blogs/BlogList";

const AllBlogs = () => {
  return (
    <>
      {/* Navbar Section */}
      <div className="bg-gradient-to-r from-slate-600 to-slate-800">
        <Navbar />
      </div>

      {/* Blog List */}
      <BlogList />

      {/* Footer Section */}
      <div className="bg-gradient-to-r from-slate-600 to-slate-800">
        <Footer />
      </div>
    </>
  );
};

export default AllBlogs;
