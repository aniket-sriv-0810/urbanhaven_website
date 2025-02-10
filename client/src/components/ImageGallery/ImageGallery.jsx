import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";

const ImageGallery = () => {
  const images = [
    { id: 1, src: "https://www.jaypeehotels.com/blog/wp-content/uploads/2024/09/Blog-6-scaled.jpg", alt: "Dining Area" },
    { id: 2, src: "https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=", alt: "Hotel Room 1" },
    { id: 3, src: "https://www.jaypeehotels.com/blog/wp-content/uploads/2024/09/Blog-6-scaled.jpg", alt: "Dining Area" },
    { id: 4, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuaFEX3oOvpkr_jdtAt2JeC64G5YNgnRuXaw&s", alt: "Balcony" },
    { id: 5, src: "https://www.jaypeehotels.com/blog/wp-content/uploads/2024/09/Blog-6-scaled.jpg", alt: "Dining Area" },
    { id: 6, src: "https://t3.ftcdn.net/jpg/06/19/00/08/360_F_619000872_AxiwLsfQqRHMkNxAbN4l5wg1MsPgBsmo.jpg", alt: "Washroom" },
    { id: 7, src: "https://www.jaypeehotels.com/blog/wp-content/uploads/2024/09/Blog-6-scaled.jpg", alt: "Dining Area" },
  ];

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handlePrevious = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const closeLightbox = () => setSelectedImageIndex(null);

  return (
    <div className="bg-gray-50 py-12 px-4 md:px-8 lg:px-16">
      {/* Gallery Title */}
      <h1 className="text-2xl sm:text-4xl font-bold text-center text-gray-900 mb-10">
        Stunning Image Gallery
      </h1>

      {/* Thumbnails with Horizontal Scrolling for Mobile */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar sm:flex-wrap justify-center">
        {images.map((image, index) => (
          <img
            key={image.id}
            src={image.src}
            alt={image.alt}
            className="w-48 h-32 sm:w-64 sm:h-40 lg:w-80 lg:h-56 object-cover rounded-lg shadow-md cursor-pointer hover:scale-105 hover:shadow-lg transition-transform duration-300"
            onClick={() => setSelectedImageIndex(index)}
          />
        ))}
      </div>

      {/* Lightbox */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          {/* Lightbox Container */}
          <div className="relative max-w-4xl w-full p-4">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 p-1 md:top-7 md:right-7 border-white border-2 md:p-2 rounded-full text-white text-2xl hover:text-red-500 hover:border-red-500 transition duration-300"
              onClick={closeLightbox}
            >
              <FaTimes />
            </button>

            {/* Previous Button */}
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-60 rounded-full p-3 hover:bg-gray-700 transition duration-300"
              onClick={handlePrevious}
            >
              <FaArrowLeft />
            </button>

            {/* Selected Image */}
            <img
              src={images[selectedImageIndex]?.src}
              alt={images[selectedImageIndex]?.alt}
              className="w-full max-h-[80vh] object-contain rounded-lg shadow-lg transition-transform duration-500"
            />

            {/* Next Button */}
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-60 rounded-full p-3 hover:bg-gray-700 transition duration-300"
              onClick={handleNext}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
