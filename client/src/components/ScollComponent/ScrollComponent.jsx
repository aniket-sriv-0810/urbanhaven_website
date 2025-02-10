import React from "react";
;
const ScrollComponent = () => {
  return (
    <div className="relative h-screen w-full mt-5 mb-5">
  {/* Background Image with Parallax Effect */}
  <div
    className="absolute inset-0 bg-fixed bg-center bg-cover bg-no-repeat"
    style={{
      backgroundImage: "url('/assets/home-banner.jpg')",
    }}
  ></div>

  {/* Dark Overlay with Glass Effect */}
  <div className="absolute inset-0 bg-black/50  "></div>

  {/* Content Section */}
  <div className="relative z-10 flex flex-col justify-center items-center h-full px-6 text-center text-white">
    <h1 className="text-2xl sm:text-6xl font-extrabold leading-tight drop-shadow-md">
      Welcome to <span className="text-yellow-400">Urbanhaven</span>
    </h1>
    <p className="text-base sm:text-xl max-w-2xl mt-4 leading-relaxed opacity-90">
      Escape into a world of elegance and tranquility. Experience unparalleled comfort and luxury in the heart of the city, where every stay is unforgettable.
    </p>

  </div>
</div>

  );
};

export default ScrollComponent;
