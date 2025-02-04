import React, {  useEffect} from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/Navbars/AdminNavbar/AdminNavbar";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const AdminHome = () => {
useEffect(() => {
    AOS.init({
       // Start animation after scrolling 100px
      duration: 1500, // Animation duration
      easing: "ease-in-out", // Smooth effect
      mirror:true,
      once: false, // Animation repeats on scroll
    });
  }, []);

    return (
        <>
        <AdminNavbar/>
              <div data-aos="fade-up">
          <Outlet />
  </div>
        </>
    )
}

export default AdminHome ;