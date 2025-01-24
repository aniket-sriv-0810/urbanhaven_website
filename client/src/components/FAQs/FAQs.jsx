import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How can I book a room on Urbanhaven?",
      answer:
        "Booking a room is easy! Simply search for your preferred location, select a property, and click on 'Book Now' to complete the reservation.",
    },
    {
      question: "What is Urbanhaven's cancellation policy?",
      answer:
        "You can cancel your booking up to 24 hours before check-in for a full refund. For more details, visit our cancellation policy page.",
    },
    {
      question: "Are there any hidden charges?",
      answer:
        "No, Urbanhaven provides transparent pricing with all taxes and charges included upfront. There are no hidden fees.",
    },
    {
      question: "Can I contact the host directly?",
      answer:
        "Yes, once your booking is confirmed, you can contact the host through our in-app messaging system for any queries.",
    },
  ];

  return (
    <section className="faq-section bg-gradient-to-b from-blue-200 to-white py-16 px-5 sm:px-20">
    {/* Title */}
    <h2 className="text-center text-4xl sm:text-5xl font-bold text-gray-800 mb-12">
      Frequently Asked Questions
    </h2>

    {/* FAQ Items */}
    <div className="max-w-4xl mx-auto space-y-6">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="faq-item border border-gray-300 rounded-xl shadow-md overflow-hidden transition-all duration-300"
        >
          <button
            className="w-full text-left flex justify-between items-center bg-white p-5 sm:p-6 font-semibold text-gray-800 hover:bg-blue-50 hover:shadow-lg transition"
            onClick={() => toggleFAQ(index)}
          >
            <span>{faq.question}</span>
            <span className="ml-4 text-xl">
              {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </button>
          {/* FAQ Answer */}
          {activeIndex === index && (
            <div className="p-5 sm:p-6 bg-blue-50 text-gray-700 leading-relaxed">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  </section>
  );
};

export default FAQs;
