import React, { useState , useEffect} from "react";
import HeaderImage from "./HeaderImage";
import AdminHeader from "./AdminHeader";
import AdminDesktop from "./AdminDesktop";
import AdminMobile from "./AdminMobile";
import AOS from "aos";
import "aos/dist/aos.css";

const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  useEffect(() => {
    AOS.init({
      duration: 1500, // Animation duration
      easing: "ease-in-out", // Smooth effect
      mirror: true,
      once: false, // Animation repeats on scroll
    });
  }, []);

  return (
    <nav className="bg-gradient-to-r from-gray-700 to-slate-800 text-white  relative z-50">
      <div className="flex  items-center justify-center gap-5 ">
        
        {/* Logo & Header - Centered Image */}
        <div className="flex justify-between items-center  space-x-4 sm:-ml-10 sm:mr-10" >
          <HeaderImage />
          <AdminHeader />
        </div>

        {/* Desktop Menu (Hidden on Small Screens) */}
        <div className="hidden lg:block">
          <AdminDesktop />
        </div>

        {/* Mobile Menu */}
        <AdminMobile isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </div>
    </nav>
  );
};

export default AdminNavbar;
