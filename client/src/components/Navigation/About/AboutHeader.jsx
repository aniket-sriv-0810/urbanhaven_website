import React from "react";
import Logo from "../../../assets/webiste_full_logo.png";

const AboutHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center text-center">
      <h1
        className="mt-20 mb-10 text-center font-extrabold text-xl xs:text-2xl lg:text-4xl md:text-4xl text-gray-900 capitalize 
            bg-gradient-to-t from-gray-700 to-orange-500 text-transparent bg-clip-text
            drop-shadow-lg shadow-gray-600 p-8 rounded-xl animate-fadeIn"
        data-aos="fade-up"
      >
        Discover UrbanHaven Hotels
      </h1>
      <img
        src={Logo}
        alt="Our Logo"
        className="w-28 h-28 md:mt-6 sm:ml-5 bg-gray-100 rounded-full shadow-lg xs:rounded-none xs:shadow-none object-cover hover:scale-105 transition-transform duration-300"
        data-aos="fade-down"
      />
    </div>
  );
};

export default AboutHeader;
