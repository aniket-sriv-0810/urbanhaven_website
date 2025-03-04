import React from "react";
import SkeletonCard from "./SkeletonCard";

const SkeletonList = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {[...Array(2)].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default SkeletonList;
