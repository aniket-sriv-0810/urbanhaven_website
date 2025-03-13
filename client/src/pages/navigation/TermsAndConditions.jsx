import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import urbanHavenLogo from "../../assets/webiste_full_logo.png"; // Update the path as per your project structure

const TermsAndConditions = () => {
  return (
    <section className="bg-gray-50 text-gray-900 py-16 px-6 md:px-16 lg:px-32">
      {/* Header with Logo */}
      <div className="text-center mb-12">
        <img
          src={urbanHavenLogo}
          alt="Urban Haven Hotels Logo"
          className="mx-auto w-24 md:w-32 mb-4"
        />
        <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
          Terms & Conditions
        </h1>
        <p className="text-lg text-gray-600 mt-3">
          Last updated: <span className="font-medium text-teal-600">March 2025</span>
        </p>
      </div>

      {/* Content Wrapper */}
      <div className="max-w-6xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-lg border border-gray-200">
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Welcome to <span className="font-bold text-teal-600">Urban Haven Hotels</span>. By using our services, you agree to these terms. Please read them carefully.
        </p>

        <div className="space-y-8">
          {/* Sections */}
          {[
            {
              title: "1. Acceptance of Terms",
              content:
                "By accessing or using our website, you agree to comply with these terms. If you do not agree, please refrain from using our services.",
            },
            {
              title: "2. User Responsibilities",
              content:
                "You are responsible for providing accurate and up-to-date information while booking accommodations. Misuse of our platform or false information may result in account suspension.",
            },
            {
              title: "3. Booking & Cancellations",
              content:
                "Bookings are subject to availability. Cancellations must follow our policy. Fees may apply for late cancellations or no-shows.",
            },
            {
              title: "4. Privacy & Data Protection",
              content:
                "We prioritize your privacy. By using our services, you consent to data collection as outlined in our Privacy Policy.",
            },
            {
              title: "5. Liability Limitation",
              content:
                "Urban Haven Hotels is not liable for indirect or incidental damages arising from the use of our platform. Users assume all risks associated with their stay.",
            },
            {
              title: "6. Amendments",
              content:
                "We reserve the right to amend these terms at any time. Continued use of our services constitutes acceptance of the updated terms.",
            },
          ].map((section, index) => (
            <div key={index} className="relative">
              <h2 className="text-2xl font-semibold text-teal-700 flex items-center gap-2">
                <FaCheckCircle className="text-teal-500" /> {section.title}
              </h2>
              <p className="text-gray-700 text-base leading-relaxed mt-2">
                {section.content}
              </p>
              {index < 5 && (
                <hr className="border-t border-gray-300 my-6 opacity-50" />
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="text-center mt-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Need Assistance?
          </h3>
          <p className="text-gray-600 text-base leading-relaxed mb-6">
            For questions, contact us at{" "}
            <a
              href="mailto:support@urbanhaven.com"
              className="text-teal-600 font-medium hover:underline"
            >
              support@urbanhaven.com
            </a>
          </p>
          <a
            href="/contact"
            className="bg-teal-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-500 transition duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
