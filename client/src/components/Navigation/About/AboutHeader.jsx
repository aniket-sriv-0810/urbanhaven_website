import React from "react";
import Logo from "../../../assets/webiste_full_logo.png";

const AboutHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center text-center">
      <img
        src={Logo}
        alt="Our Logo"
        className="w-28 h-28 md:mt-6 sm:ml-5 bg-gray-100 rounded-full shadow-lg  object-cover hover:scale-105 transition-transform duration-300"
        data-aos="fade-down"
      />
    </div>
  );
};

export default AboutHeader;
