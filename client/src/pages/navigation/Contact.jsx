import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../components/userContext/userContext';
import axios from 'axios';
import Navbar from '../../components/Navbars/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ContactHeader from '../../components/Contact/ContactHeader';
import ContactInfo from '../../components/Contact/ContactInfo';
import ContactForm from '../../components/Contact/ContactForm';
import ContactFooter from '../../components/Contact/ContactFooter';

const Contact = () => {
  const { user } = useUser();
  const [contact, setContact] = useState({ message: "" });
  const navigate = useNavigate();

  const handleInput = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataSent = { user: user._id, message: contact.message };
      console.log("Data sent:", dataSent);
      
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/v1/navigate/contact`, dataSent, { withCredentials: true });

      if (response.status === 200) {
        setContact({ message: "" });
        navigate('/contact/confirmed');
      }
    } catch (error) {
      console.error("Failed to send feedback", error);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-slate-600 to-slate-800">
        <Navbar />
      </div>

      <section className="bg-gradient-to-b from-green-500 to-gray-600 text-gray-900 py-16 px-6 md:px-12 lg:px-24 xl:px-32">
        <div className="max-w-7xl mx-auto">
          <ContactHeader />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <ContactInfo />
            <ContactForm handleInput={handleInput} handleSubmit={handleSubmit} contact={contact} user={user} />
          </div>
          <ContactFooter />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
