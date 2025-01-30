// Import necessary libraries
import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
// Define the Contact Us component
const ContactUs = () => {
  return (
    <section className="bg-gradient-to-r from-emerald-500 to-green-600 text-gray-900 py-16 px-6 md:px-12 lg:px-24 xl:px-32">
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-gray-50 mb-4">
          Get in Touch
        </h1>
        <p className="text-lg text-gray-50 max-w-2xl mx-auto leading-relaxed">
          Have questions or need assistance? <br />
          <span className="font-semibold text-yellow-400">UrbanHaven Hotels</span> is here to help you 24/7.
        </p>
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
        {/* Contact Information */}
        <div className="flex flex-col justify-center bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center">
            Contact Information
          </h2>
          <ul className="space-y-6 text-lg text-gray-800">
            <li className="flex items-center gap-4">
              <FaPhoneAlt className="text-teal-500 text-xl" />
              <a href="tel:+1234567890" className="hover:text-teal-700 transition">
                <strong>Phone:</strong> +1 234 567 890
              </a>
            </li>
            <li className="flex items-center gap-4">
              <FaEnvelope className="text-teal-500 text-xl" />
              <a href="mailto:support@urbanhaven.com" className="hover:text-teal-700 transition">
                <strong>Email:</strong> support@urbanhaven.com
              </a>
            </li>
            <li className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-teal-500 text-xl" />
              <span><strong>Address:</strong> 123 UrbanHaven Lane, Comfort City, Anywhere 56789</span>
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center">
            Send Us a Message
          </h2>
          <form className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Your Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                placeholder="Write your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 px-4 rounded-md shadow-md hover:bg-teal-500 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Footer Message */}
      <div className="text-center mt-16">
        <h3 className="text-2xl font-semibold text-gray-800">
          We’d Love to Hear from You!
        </h3>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed mt-2">
          Whether you have inquiries, feedback, or need assistance, 
          <span className="font-semibold text-teal-600"> UrbanHaven Hotels</span> is always ready to help.
        </p>
      </div>
    </div>
  </section>
  );
};

export default ContactUs;
