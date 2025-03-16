import React from "react";

const ShowHotelHeading = () => {
  return (
    <div className="flex flex-col items-center text-center mt-10 mb-10 px-4 ">
      <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-pink-500 ">
        Check out the Hotel details
      </h1>
      <span className="mt-2 text-xs sm:text-sm md:text-base text-red-500 font-semibold animate-pulse">
        Explore amazing amenities and features!
      </span>
    </div>
  );
};

export default ShowHotelHeading;
