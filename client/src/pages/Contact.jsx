// Import necessary libraries
import React from 'react';

// Define the Contact Us component
const ContactUs = () => {
  return (
    <section className="bg-gray-100 text-gray-800 py-16 px-6 md:px-16 lg:px-32">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-teal-600">
          Contact Us
        </h1>
        <p className="text-lg text-center text-gray-700 mb-8 leading-relaxed">
          Have questions or need assistance? Reach out to our team at <span className="font-bold text-teal-600">UrbanHaven Hotels</span>. We’re here to help you 24/7.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold text-teal-600 mb-4">
              Get in Touch
            </h2>
            <ul className="text-gray-700 text-base leading-relaxed">
              <li className="mb-4">
                <strong>Phone:</strong> <a href="tel:+1234567890" className="text-teal-600 hover:underline">+1 234 567 890</a>
              </li>
              <li className="mb-4">
                <strong>Email:</strong> <a href="mailto:support@urbanhaven.com" className="text-teal-600 hover:underline">support@urbanhaven.com</a>
              </li>
              <li className="mb-4">
                <strong>Address:</strong> 123 UrbanHaven Lane, Comfort City, Anywhere 56789
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-teal-600 mb-4 text-center">
              Send Us a Message
            </h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-600">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Write your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-teal-500 transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        <div className="text-center mt-16">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            We’d Love to Hear from You!
          </h3>
          <p className="text-gray-600 text-base leading-relaxed">
            Feel free to reach out with any inquiries, feedback, or suggestions. At UrbanHaven, we prioritize your comfort and satisfaction.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
