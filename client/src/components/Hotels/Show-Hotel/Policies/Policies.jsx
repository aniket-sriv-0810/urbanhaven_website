import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const Policies = () => {
  const navigate = useNavigate();
  const policies = [
    {
      title: "Check-In and Check-Out",
      description:
        "Check-in time is 12:00 PM and check-out time is 11:00 AM. Early check-in and late check-out are subject to availability and may incur additional charges.",
    },
    {
      title: "Cancellation Policy",
      description:
        "Free cancellation up to 48 hours before check-in. Cancellations within 48 hours will incur a fee equal to the first night's stay.",
    },
    {
      title: "Guest Identification",
      description:
        "All guests must provide a valid government-issued ID at the time of check-in. International guests must present a valid passport and visa.",
    },
    {
      title: "No Smoking Policy",
      description:
        "Smoking is strictly prohibited inside the rooms. Designated smoking areas are available within the premises.",
    },
    {
      title: "Pet Policy",
      description:
        "Pets are not allowed, except for service animals with proper documentation.",
    },
    {
      title: "Payment Methods",
      description:
        "We accept major credit/debit cards, UPI, and cash payments. Full payment must be made at the time of check-in.",
    },
    {
      title: "Quiet Hours",
      description:
        "Quiet hours are from 10:00 PM to 7:00 AM. Please respect the comfort of other guests.",
    },
    {
      title: "Damages and Liability",
      description:
        "Guests are responsible for any damages caused during their stay. Charges will be applied to the provided payment method.",
    },
  ];

  return (
    <div className="mt-10 px-6 sm:px-12 lg:px-20 py-12 bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Page Title */}
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-10">
        Our Policies & Guidelines
      </h3>

      {/* Policy Cards */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {policies.map((policy, index) => (
          <li
            key={index}
            className="relative bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-l-4 border-green-500 hover:bg-green-100 "
          >
            <div className="flex items-start  ">
              <FaCheckCircle className="text-green-600 text-3xl mr-4 " />
              <div>
                <h4 className="text-base font-semibold text-gray-900 mb-2">
                  {policy.title}
                </h4>
                <p className="text-gray-700 text-xs xs:text-sm leading-relaxed ">
                  {policy.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Call-to-Action Section */}
      <div className="text-center mt-16">
        <p className="text-gray-600 text-lg mb-4">
          Have questions about our policies? We're here to help.
        </p>
        
        <button
        onClick={() => navigate('/contact')}
         className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default Policies;
