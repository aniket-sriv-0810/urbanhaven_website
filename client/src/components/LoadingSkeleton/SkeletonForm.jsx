import React from "react";

const SkeletonForm = () => {
  return (
    <div className="max-w-2xl w-full p-6 bg-white shadow-md rounded-lg animate-pulse">
      {/* Title Placeholder */}
      <div className="h-6 w-1/3 bg-gray-300 rounded mb-2"></div>
      <div className="h-10 w-full bg-gray-200 rounded mb-5"></div>

      {/* Description Placeholder */}
      <div className="h-6 w-1/3 bg-gray-300 rounded mb-2"></div>
      <div className="h-24 w-full bg-gray-200 rounded mb-5"></div>

      {/* Image Upload Placeholder */}
      <div className="h-6 w-1/3 bg-gray-300 rounded mb-2"></div>
      <div className="h-10 w-full bg-gray-200 rounded mb-5"></div>

      {/* Image Preview Placeholder */}
      <div className="h-48 w-full bg-gray-200 rounded-lg mb-5"></div>

      {/* Button Placeholder */}
      <div className="h-12 w-40 bg-gray-300 rounded-lg mx-auto"></div>
    </div>
  );
};

export default SkeletonForm;
