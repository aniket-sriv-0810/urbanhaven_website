import React , {useEffect}from 'react'
import { useUser } from '../../userContext/userContext'
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
const NavHeader = () => {
      const { user, setUser } = useUser();
     useEffect(() => {
        AOS.init({
          duration: 1500, // Animation duration
          easing: "ease-in-out", // Smooth effect
          mirror:true,
          once: false, // Animation repeats on scroll
        });
      }, []);
  return (
    <div>
      <h1 className="hidden sm:text-lg sm:block lg:hidden xl:block text-white font-semibold truncate">
            <p data-aos="fade-down">Welcome <span className='text-yellow-300'>{user ? user.name : null}</span> to UrbanHaven ! </p>
          </h1>
    </div>
  )
}

export default NavHeader
