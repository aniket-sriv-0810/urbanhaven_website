import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import urbanHavenLogo from "../../assets/webiste_full_logo.png"; // Adjust path as per your project

const TermsAndConditions = () => {
  return (
    <section className="bg-gradient-to-br from-gray-100 to-gray-300 text-gray-900 py-16 px-6 sm:px-12 lg:px-24">
      {/* Header with Logo & Title */}
      <div className="text-center mb-12 animate-fade-in">
        <img
          src={urbanHavenLogo}
          alt="Urban Haven Logo"
          className="mx-auto w-28 sm:w-36 lg:w-44 mb-4 drop-shadow-lg"
        />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-wide">
          Terms & Conditions
        </h1>
        <p className="text-lg text-gray-700 mt-2">
          Last Updated: <span className="font-semibold text-teal-600">March 2025</span>
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto bg-white p-8 sm:p-12 rounded-xl shadow-lg border border-gray-200 animate-fade-in">
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Welcome to <span className="font-bold text-teal-600">Urbanhaven</span>. By using our services, you agree to the terms outlined below.
          Please read them carefully before proceeding.
        </p>

        {/* Terms & Conditions List */}
        <div className="space-y-8">
          {[
            {
              title: "1. Acceptance of Terms",
              content:
                "By accessing Urbanhaven, you acknowledge and accept these terms. If you do not agree, please discontinue use immediately.",
            },
            {
              title: "2. Eligibility & User Responsibilities",
              content:
                "Users must be at least 18 years old to make a booking. You agree to provide accurate information and use our services responsibly.",
            },
            {
              title: "3. Booking Policies",
              content:
                "All bookings are subject to availability. Urbanhaven reserves the right to cancel reservations due to unforeseen circumstances, with full refunds issued where applicable.",
            },
            {
              title: "4. Cancellation & Refunds",
              content:
                "Cancellations and refund eligibility depend on the property's specific terms. Please review cancellation policies before booking.",
            },
            {
              title: "5. Payment & Security",
              content:
                "Payments are securely processed using encrypted transactions. Accepted methods include credit/debit cards, UPI, PayPal, and digital wallets.",
            },
            {
              title: "6. Privacy & Data Protection",
              content:
                "Your data privacy is important to us. We adhere to strict security measures to protect personal and financial information.",
            },
            {
              title: "7. Code of Conduct",
              content:
                "Users must respect property rules, local laws, and Urbanhaven policies. Any misconduct may result in account suspension.",
            },
            {
              title: "8. Liability Disclaimer",
              content:
                "Urbanhaven is not responsible for unforeseen incidents during your stay. We act solely as a booking intermediary between guests and accommodation providers.",
            },
            {
              title: "9. Amendments to Terms",
              content:
                "Urbanhaven reserves the right to update these terms at any time. Continued use of our services implies acceptance of the latest version.",
            },
            {
              title: "10. Contact & Support",
              content:
                "For inquiries or assistance, contact our 24/7 customer support team via phone, email, or live chat.",
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
