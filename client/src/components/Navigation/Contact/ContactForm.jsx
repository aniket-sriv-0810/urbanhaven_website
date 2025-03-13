import React from 'react';
import { BiSolidPaperPlane } from "react-icons/bi";

const ContactForm = ({ handleInput, handleSubmit, contact, user }) => {
  return (
    <div className="bg-white shadow-xl rounded-xl p-8 border-t-4 border-green-500">
      <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center">Send Us a Message</h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input name="name" type="text" id="name" className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" placeholder="Enter your full name" value={user.name} disabled />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input name="email" type="email" id="email" className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" placeholder="Enter your email" value={user.email} disabled />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
          <textarea onChange={handleInput} name="message" id="message" rows="4" className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" placeholder="Write your message..." value={contact.message} required></textarea>
        </div>
        <span className="ml-5 flex items-center justify-center gap-2">
          <button type="submit" className="w-full mr-5 flex justify-center items-center sm:w-[70%] bg-green-600 text-white p-2 sm:p-3 rounded-xl shadow-md hover:bg-teal-500 transition duration-300">
            Send Message
            <BiSolidPaperPlane className="relative left-5 text-xl text-white" />
          </button>
        </span>
      </form>
    </div>
  );
};

export default ContactForm;
