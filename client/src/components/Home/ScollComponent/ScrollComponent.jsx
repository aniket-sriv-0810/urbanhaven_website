import React from "react";

const ScrollComponent = () => {
  return (
    <div className="relative h-screen w-full mt-5 mb-5">
  {/* Background Image with Parallax Effect */}
  <div
    className="bg-[url('/assets/home-banner.jpg')]  absolute inset-0 bg-fixed bg-center bg-cover bg-no-repeat"
  ></div>

  {/* Dark Overlay with Glass Effect */}
  <div className="absolute inset-0 bg-black/50  "></div>

  {/* Content Section */}
  <div className="relative z-10 flex flex-col justify-center items-center h-full px-6 text-center text-white" data-aos="fade-down">
    <h1 className="text-xl sm:text-4xl lg:text-6xl font-extrabold leading-tight drop-shadow-md">
      Welcome to <span className="text-yellow-400">Urbanhaven</span>
    </h1>
    <p className="text-base sm:text-xl max-w-2xl mt-4 leading-relaxed opacity-90">
    Welcome to Urban Haven Hotels – Where Luxury Meets Tranquility

Experience a harmonious blend of elegance and sophistication at Urban Haven Hotels. Nestled in the heart of the city, we offer a serene retreat with world-class comfort, impeccable hospitality, and modern amenities. Whether you're here for business, leisure, or a weekend escape, every moment is crafted to perfection where indulgence, relaxation, and style come together effortlessly.
</p>

  </div>
</div>

  );
};

export default ScrollComponent;
