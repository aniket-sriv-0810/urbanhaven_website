import React , {useEffect} from 'react'
import { NavLink } from 'react-router-dom';
import WebsiteLogo from '../../../assets/main-logo.png';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // Optional for default styling
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
const NavImg = () => {
     useEffect(() => {
        AOS.init({
          duration: 1500, // Animation duration
          easing: "ease-in-out", // Smooth effect
          mirror:true,
          once: false, // Animation repeats on scroll
        });
      }, []);
  return (
    <>
        <Tippy content="Urbanhaven" className='bg-red-400'>
          <NavLink to="/">
            <img
              src={WebsiteLogo}
              alt="UrbanHaven"
              className="w-16 sm:w-20 lg:w-24"
              data-aos="fade-down"/>
          </NavLink>
          </Tippy>
    </>
  )
}

export default NavImg
