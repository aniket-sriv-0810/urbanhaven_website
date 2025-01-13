import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const Policies = () => {
  const policies = [
    {
      title: "Check-In and Check-Out",
      description:
        "Check-in time is 2:00 PM and check-out time is 11:00 AM. Early check-in and late check-out are subject to availability and may incur additional charges.",
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
    <div className="mt-10 px-6 sm:px-12 lg:px-20 bg-gray-50 py-10">
      <h3 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        Our Policies & Guidelines
      </h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {policies.map((policy, index) => (
          <li
            key={index}
            className="relative bg-gradient-to-br from-white to-gray-100 shadow-lg rounded-xl p-6 hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-start">
              <FaCheckCircle className="text-green-600 text-3xl mr-4" />
              <div>
                <h4 className="text-2xl font-semibold text-gray-900 mb-2">
                  {policy.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {policy.description}
                </p>
              </div>
            </div>
         
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Policies;
