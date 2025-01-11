import React from 'react';
import { FaCheckCircle } from "react-icons/fa";

const Policies = () => {
  const policies = [
    {
      title: "Check-In and Check-Out",
      description: "Check-in time is 2:00 PM and check-out time is 11:00 AM. Early check-in and late check-out are subject to availability and may incur additional charges.",
    },
    {
      title: "Cancellation Policy",
      description: "Free cancellation up to 48 hours before check-in. Cancellations within 48 hours will incur a fee equal to the first night's stay.",
    },
    {
      title: "Guest Identification",
      description: "All guests must provide a valid government-issued ID at the time of check-in. International guests must present a valid passport and visa.",
    },
    {
      title: "No Smoking Policy",
      description: "Smoking is strictly prohibited inside the rooms. Designated smoking areas are available within the premises.",
    },
    {
      title: "Pet Policy",
      description: "Pets are not allowed, except for service animals with proper documentation.",
    },
    {
      title: "Payment Methods",
      description: "We accept major credit/debit cards, UPI, and cash payments. Full payment must be made at the time of check-in.",
    },
    {
      title: "Quiet Hours",
      description: "Quiet hours are from 10:00 PM to 7:00 AM. Please respect the comfort of other guests.",
    },
    {
      title: "Damages and Liability",
      description: "Guests are responsible for any damages caused during their stay. Charges will be applied to the provided payment method.",
    },
  ];

  return (
    <div className="mt-8 px-4 sm:px-8 lg:px-16">
      <h3 className="text-2xl font-semibold text-center mb-6">Policies and Regulations</h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {policies.map((policy, index) => (
          <li
            key={index}
            className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center mb-3">
              <FaCheckCircle className="text-green-500 text-2xl mr-3" />
              <h4 className="text-xl font-medium">{policy.title}</h4>
            </div>
            <p className="text-gray-700">{policy.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Policies;
