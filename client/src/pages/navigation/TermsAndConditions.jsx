import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import urbanHavenLogo from "../../assets/webiste_full_logo.png"; // Adjust path as per your project

const TermsAndConditions = () => {
  return (
    <section className="bg-gray-200 text-gray-900 py-16 px-6 sm:px-12 lg:px-24">
      {/* Header with Logo & Title */}
      <div className="text-center mb-12">
        <img
          src={urbanHavenLogo}
          alt="Urban Haven Hotels Logo"
          className="mx-auto w-28 sm:w-36 lg:w-44 mb-4 animate-fade-in"
        />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-wide">
          Terms & Conditions
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Last updated:{" "}
          <span className="font-semibold text-teal-600">March 2025</span>
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto shadow-gray-500 bg-white p-8 sm:p-12 rounded-xl shadow-2xl border border-gray-200 animate-fade-in">
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Welcome to <span className="font-bold text-teal-600">Urban Haven Hotels</span>.
          By using our services, you agree to the following terms. Please read them carefully.
        </p>

        {/* Terms & Conditions List */}
        <div className="space-y-10">
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
            <div
              key={index}
              className="relative bg-gray-50 p-6 rounded-lg shadow-md border-l-4 border-teal-500"
            >
              <h2 className="text-xl font-semibold text-teal-700 flex items-center gap-3">
                <FaCheckCircle className="text-teal-500 text-lg" /> {section.title}
              </h2>
              <p className="text-gray-700 text-base leading-relaxed mt-2">{section.content}</p>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default TermsAndConditions;
