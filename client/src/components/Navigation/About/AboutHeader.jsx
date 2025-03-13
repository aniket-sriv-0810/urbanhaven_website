import React from "react";
import Logo from "../../../assets/webiste_full_logo.png";

const AboutHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center text-center">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-500 animate-fadeInUp">
        Discover UrbanHaven Hotels
      </h1>
      <img
        src={Logo}
        alt="Our Logo"
        className="w-28 h-28 mt-4 sm:ml-5 bg-gray-100 rounded-full shadow-lg xs:rounded-none xs:shadow-none object-cover hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
};

export default AboutHeader;
