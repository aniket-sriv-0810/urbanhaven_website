import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactInfo = () => {
  return (
    <div className="flex flex-col justify-center bg-white shadow-xl rounded-2xl p-8 border-t-4 border-green-500">
      <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center">Contact Information</h2>
      <ul className="space-y-6 text-lg text-gray-800">
        <li className="flex items-center gap-4">
          <FaPhoneAlt className="text-green-500 text-xl" />
          <a href="tel:+1234567890" className="hover:text-teal-700 transition">
            <strong className="hidden md:block">Phone:</strong> +1 234 567 890
          </a>
        </li>
        <li className="flex items-center gap-4">
          <FaEnvelope className="text-blue-500 text-xl" />
          <a href="mailto:support@urbanhaven.com" className="hover:text-teal-700 transition">
            <strong className="hidden md:block">Email:</strong> 
            <span className="text-base"> support@urbanhaven.com</span>
          </a>
        </li>
        <li className="flex items-center gap-4">
          <FaMapMarkerAlt className="text-red-500 text-xl" />
          <span>
            <strong className="hidden md:block">Address:</strong>
            <span className="text-sm"> 123 UrbanHaven Lane, Comfort City, Anywhere 56789</span>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default ContactInfo;
