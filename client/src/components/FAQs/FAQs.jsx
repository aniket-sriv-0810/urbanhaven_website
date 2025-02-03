import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";


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
    <section className="faq-section bg-gray-100 py-16 px-5 sm:px-20">
    {/* Title */}
    <div className="text-center mb-12">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 drop-shadow-lg flex items-center justify-center gap-2">
        <FaQuestionCircle className="text-blue-600 text-5xl" />
        FAQs
      </h2>
      <p className="text-lg sm:text-xl text-gray-600 mt-2">
        Your questions, answered.
      </p>
    </div>

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
            <span className="flex items-center gap-2">
              <FaQuestionCircle className="text-blue-600 text-lg" />
              {faq.question}
            </span>
            <span className="ml-4 text-xl">
              {activeIndex === index ? (
                <FaChevronUp className="text-blue-500" />
              ) : (
                <FaChevronDown className="text-gray-500" />
              )}
            </span>
          </button>
          {/* FAQ Answer */}
          <div
            className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
              activeIndex === index ? "max-h-96 p-5 sm:p-6 bg-blue-50 text-gray-700" : "max-h-0"
            }`}
          >
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  </section>
  );
};

export default FAQs;
