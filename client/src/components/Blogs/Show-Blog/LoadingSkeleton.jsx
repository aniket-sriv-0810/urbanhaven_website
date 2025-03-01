import React from "react";

const LoadingSkeleton = ({ type = "card", count = 1 }) => {
  const skeletons = Array.from({ length: count });

  return (
    <div className="flex justify-center gap-6 w-full px-4 py-6">
      {skeletons.map((_, index) => (
        <div key={index} className={`w-full ${getSkeletonWidth(type)} bg-white p-6 rounded-lg shadow-md animate-pulse`}>
          {/* Image or Icon Placeholder */}
          {["card", "blog", "list", "profile" , "form"].includes(type) && (
            <div className="h-60 bg-gray-300 rounded-lg mb-4"></div>
          )}

          {/* Title or Header Placeholder */}
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>

          {/* Description or Text Placeholder */}
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>

          {/* Button Placeholder */}
          {[ "saving"].includes(type) && (
            <div className="max-h-screen bg-gray-300 rounded-lg w-full mt-4"></div>
          )}
        </div>
      ))}
    </div>
  );
};

/* Function to set width dynamically based on type */
const getSkeletonWidth = (type) => {
  switch (type) {
    case "form":
      return "max-w-xl";
    case "list":
      return "max-w-3xl";
    case "blog":
      return "max-w-2xl";
    case "profile":
      return "max-w-md";
    default:
      return "max-w-lg"; // Default for card, delete, saving
  }
};

export default LoadingSkeleton;
