import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";
import { IoMdHelpCircleOutline } from "react-icons/io"; // Fancy question icon
import { MdOutlineQuestionAnswer } from "react-icons/md"; // Answer icon

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/v1/navigate/faqs`, {
        withCredentials: true,
      });

      console.log("FAQS => ", response.data.data.faq);

      if (response.status === 200) {
        setFaqs(response.data.data.faq);
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="faq-section bg-gradient-to-b from-gray-200 to-cyan-200 py-16 px-5 sm:px-20">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-lg xs:text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 drop-shadow-lg flex items-center justify-center gap-2">
          <IoMdHelpCircleOutline className="text-blue-600 text-2xl sm:text-5xl animate-pulse" />
          Frequently Asked Questions
        </h2>
        <p className="text-base sm:text-xl text-gray-600 mt-2">
          Get answers to the most common queries.
        </p>
      </div>

      {/* FAQ Items */}
      <div className="max-w-4xl mx-auto space-y-6">
        {faqs.length > 0 ? (
          faqs.map((faq, index) => (
            <div
              key={faq._id}
              className="faq-item bg-white border border-gray-300 rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
            >
              <button
                className="w-full text-left flex justify-between items-center p-5 sm:p-6 font-semibold text-gray-800 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-blue-50 hover:to-white transition"
                onClick={() => toggleFAQ(index)}
              >
                <span className="flex items-center gap-3 text-xs sm:text-lg">
                  <FaQuestionCircle className="text-blue-600 text-2xl" />
                  {faq.title}
                </span>
                <span className="ml-4 text-2xl transition-transform duration-300">
                  {activeIndex === index ? (
                    <FaChevronUp className="text-blue-500 rotate-180" />
                  ) : (
                    <FaChevronDown className="text-gray-500" />
                  )}
                </span>
              </button>

              {/* FAQ Answer */}
              <div
                className={`bg-blue-500 transition-all duration-500 ease-in-out overflow-hidden ${
                  activeIndex === index
                    ? "max-h-96 p-5 sm:p-6 bg-blue-50 text-gray-700 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex items-center gap-5 text-xs sm:text-lg">
                  <MdOutlineQuestionAnswer className="text-white text-3xl" />
                  <p className=" text-white">{faq.solution}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No FAQs available.</p>
        )}
      </div>
    </section>
  );
};

export default FAQs;
