import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import NavImg from "./NavImg";
import NavHeader from "./NavHeader";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
const Navbar = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500, // Animation duration
      easing: "ease-in-out", // Smooth effect
      mirror: true,
      once: false, // Animation repeats on scroll
    });
  }, []);

  return (
    <nav className="  text-white  ">
      <div className="container flex justify-center items-center px-6 sm:justify-between  lg:px-8">
        <div className="flex  items-center  xs:-ml-5 space-x-5" data-aos="fade-down">
          <NavImg />
          <NavHeader />
        </div>

        <DesktopNavbar />

        <MobileNavbar />
      </div>
    </nav>
  );
};

export default Navbar;
