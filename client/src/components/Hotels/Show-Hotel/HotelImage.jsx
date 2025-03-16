import React from 'react';

const HotelImage = ({ image, title }) => {
  return (
    <div className="mb-10 mt-10 w-full sm:w-[80%]  mx-auto px-4" data-aos="fade-up">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-auto rounded-xl shadow-xl shadow-gray-900 object-cover"
      />
    </div>
  );
};

export default HotelImage;
