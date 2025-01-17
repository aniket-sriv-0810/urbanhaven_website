import React from "react";
;
const ScrollComponent = () => {
  return (
    <div className="bg-[url(/assets/home-banner.jpg)] relative h-screen bg-fixed bg-center bg-cover bg-no-repeat mt-5 mb-5" >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-5 text-center text-white">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-4">
          Welcome to Urbanhaven
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl">
          Experience luxury and comfort like never before. Nestled in the heart
          of the city, Urbanhaven combines modern elegance with world-class
          hospitality. Whether you are on a business trip or a vacation, we
          promise an unforgettable stay.
        </p>
        <div className="mt-8 flex space-x-4">
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition shadow-lg">
            Explore Rooms
          </button>
          <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition shadow-lg">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScrollComponent;
