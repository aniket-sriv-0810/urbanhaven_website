import React from "react";
import Img2 from "../../assets/about-2.jpg";
import Img3 from "../../assets/about-3.jpg";
import Img4 from "../../assets/about-4.jpg";
const Blogs = () => {
  const blogs = [
    {
      id: 1,
      title: "Top 10 Travel Destinations for 2025",
      description:
        "Explore the most popular and breathtaking destinations for 2025. From serene beaches to bustling cities, find your perfect getaway.",
      image:Img2,
      link: "/blog/top-10-travel-destinations-2025",
    },
    {
      id: 2,
      title: "Essential Travel Safety Tips",
      description:
        "Stay safe while exploring the world with our comprehensive guide to travel safety tips. From packing to local customs, we’ve got you covered.",
      image: Img3,
      link: "/blog/travel-safety-tips",
    },
    {
      id: 3,
      title: "How to Maximize Your Stay at Urbanhaven",
      description:
        "Discover the best ways to enjoy your stay at Urbanhaven. Get insider tips on amenities, services, and local attractions.",
      image: Img4,
      link: "/blog/maximize-your-stay-at-urbanhaven",
    },
  ];

  return (
    <div className="blog-section bg-gray-100 py-10 px-5 sm:px-10 lg:px-20">
      <h2 className="text-center text-3xl sm:text-4xl font-bold text-gray-800 mb-8">
        Travel Guides & Tips
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="blog-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow hover:cursor-pointer hover:scale-105 hover:shadow-gray-600"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-900 truncate">
                {blog.title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                {blog.description.slice(0, 100)}...
              </p>
              <a
                href={blog.link}
                className="inline-block mt-4 text-blue-500 hover:text-blue-700 font-medium"
              >
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
