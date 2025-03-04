import React from "react";

const SkeletonCard = () => {
  return (
    <div className="w-full max-w-2xl p-4 bg-white shadow-lg rounded-lg animate-pulse">
      {/* Image Placeholder */}
      <div className="h-56 w-full bg-gray-300 rounded-md"></div>

      {/* Title Placeholder */}
      <div className="mt-4 h-6 w-3/4 bg-gray-300 rounded"></div>

      {/* Description Placeholder */}
      <div className="mt-2 h-4 w-full bg-gray-200 rounded"></div>
      <div className="mt-2 h-4 w-5/6 bg-gray-200 rounded"></div>
      <div className="mt-2 h-4 w-3/4 bg-gray-200 rounded"></div>

      {/* Button Placeholder */}
      <div className="mt-4 h-10 w-32 bg-gray-300 rounded"></div>
    </div>
  );
};

export default SkeletonCard;
