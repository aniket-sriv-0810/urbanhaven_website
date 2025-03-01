// Import necessary libraries
import React from 'react';

// Define the Terms and Conditions component
const TermsAndConditions = () => {
  return (
    <section className="bg-gray-100 text-gray-800 py-16 px-6 md:px-16 lg:px-32">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-teal-600">
          Terms and Conditions
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Welcome to <span className="font-bold text-teal-600">UrbanHaven Hotels</span>. By using our services, you agree to the following terms and conditions. Please read them carefully before proceeding.
        </p>

        <div className="space-y-8">
          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-600 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              By accessing or using our website, you agree to comply with and be bound by these terms. If you do not agree, please refrain from using our services.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-600 mb-4">
              2. User Responsibilities
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              You are responsible for providing accurate and up-to-date information while booking accommodations. Misuse of our platform or false information may result in account suspension.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-600 mb-4">
              3. Booking and Cancellations
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              Bookings are subject to availability and confirmation. Cancellations must be made according to our cancellation policy. Fees may apply for late cancellations or no-shows.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-600 mb-4">
              4. Privacy and Data Protection
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              We prioritize your privacy and handle your personal information in accordance with our Privacy Policy. By using our services, you consent to data collection as outlined in the policy.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-600 mb-4">
              5. Liability Limitation
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              UrbanHaven Hotels is not liable for any indirect, incidental, or consequential damages arising from the use of our platform. Users assume all risks associated with their stay.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-600 mb-4">
              6. Amendments
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              We reserve the right to amend these terms and conditions at any time. Continued use of our services constitutes acceptance of the updated terms.
            </p>
          </div>
        </div>

        <div className="text-center mt-16">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Need Assistance?
          </h3>
          <p className="text-gray-600 text-base leading-relaxed mb-6">
            If you have any questions or concerns regarding these terms, feel free to contact us at <a href="mailto:support@urbanhaven.com" className="text-teal-600 hover:underline">support@urbanhaven.com</a>.
          </p>
          <a
            href="/contact"
            className="bg-teal-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-teal-500 transition duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
