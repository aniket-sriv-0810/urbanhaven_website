import React from 'react';
import { BiSolidPaperPlane } from "react-icons/bi";

const ContactForm = ({ handleInput, handleSubmit, contact, user , loading }) => {
  return (
    <div className="bg-white shadow-xl rounded-xl p-8 border-t-4 border-green-500" data-aos="fade-down">
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
        <button
        type="submit"
        disabled={loading}
        className={`w-full border-gray-500 border-2 font-semibold px-4 py-2 text-white rounded-xl mt-4 ${
          loading
            ? "bg-gray-800 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        } flex items-center justify-center gap-2`}
      >
        {loading ? (
          <>
            <span className="animate-pulse font-semibold text-green-400 flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
              Sending Feedback...
            </span>
          </>
        ) : (
          <p className='flex justify-center items-center gap-4'>
          Send Message
          <BiSolidPaperPlane className=" text-xl text-white" />
          </p>
        )}
      </button>
        </span>
      </form>
    </div>
  );
};

export default ContactForm;
