import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../components/userContext/userContext';
import axios from 'axios';
import Navbar from '../../components/Navbars/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ContactHeader from '../../components/Navigation/Contact/ContactHeader';
import ContactInfo from '../../components/Navigation/Contact/ContactInfo';
import ContactForm from '../../components/Navigation/Contact/ContactForm';
import ContactFooter from '../../components/Navigation/Contact/ContactFooter';
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
const Contact = () => {
  const { user } = useUser();
  const [contact, setContact] = useState({ message: "" });
  const navigate = useNavigate();
  const [loading , setLoading] = useState(false);
  const handleInput = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const dataSent = { user: user._id, message: contact.message };
      console.log("Data sent:", dataSent);
      
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/v1/navigate/contact`, dataSent, { withCredentials: true });

      if (response.status === 200) {
        setContact({ message: "" });
        navigate('/contact/confirmed');
      }
    } catch (error) {
      setLoading(false);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({
      offset: 60, // Start animation after scrolling 100px
      duration: 1500, // Animation duration
      easing: "ease-in-out", // Smooth effect
      mirror:true,
      once: false, // Animation repeats on scroll
    });
  }, []);
  return (
    <>
      <div className="bg-gradient-to-r from-slate-600 to-slate-800">
        <Navbar />
      </div>

      <section className="bg-gradient-to-b from-teal-700 to-gray-600 text-gray-900 py-16 px-6 md:px-12 lg:px-24 xl:px-32">
        <div className="max-w-7xl mx-auto" >
          <ContactHeader />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-24" >
            <ContactInfo />
            <ContactForm handleInput={handleInput} handleSubmit={handleSubmit} contact={contact} user={user} loading={loading}/>
          </div>
          <div  className='my-32'>
          <ContactFooter />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
