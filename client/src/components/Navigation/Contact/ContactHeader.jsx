import React from 'react';
import WebsiteLogo from '../../../assets/main-logo.png';

const ContactHeader = () => {
  return (
    <div className="text-center flex flex-col items-center">
      <img src={WebsiteLogo} alt="logo" className="w-32 h-32 -mt-10" />
      <h1 className="text-5xl font-extrabold text-gray-50 mb-4">Get in Touch</h1>
      <p className="text-lg text-gray-50 max-w-2xl mx-auto leading-relaxed">
        Have questions or need assistance? <br />
        <span className="font-semibold text-yellow-400">UrbanHaven Hotels</span> is here to help you 24/7.
      </p>
    </div>
  );
};

export default ContactHeader;
