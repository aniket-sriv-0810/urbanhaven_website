import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";

const ImageGallery = () => {
  const images = [
    { id: 1, src: "https://www.jaypeehotels.com/blog/wp-content/uploads/2024/09/Blog-6-scaled.jpg", alt: "Dining Area" },
    { id: 2, src: "https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=", alt: "Hotel Room 1" },
    { id: 3, src: "https://www.jaypeehotels.com/blog/wp-content/uploads/2024/09/Blog-6-scaled.jpg", alt: "Dining Area" },
    { id: 8, src: "https://www.jaypeehotels.com/blog/wp-content/uploads/2024/09/Blog-6-scaled.jpg", alt: "Dining Area" },
    { id: 4, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuaFEX3oOvpkr_jdtAt2JeC64G5YNgnRuXaw&s", alt: "Balcony" },
    { id: 5, src: "https://www.jaypeehotels.com/blog/wp-content/uploads/2024/09/Blog-6-scaled.jpg", alt: "Dining Area" },
    { id: 6, src: "https://t3.ftcdn.net/jpg/06/19/00/08/360_F_619000872_AxiwLsfQqRHMkNxAbN4l5wg1MsPgBsmo.jpg", alt: "Washroom" },
    { id: 7, src: "https://www.jaypeehotels.com/blog/wp-content/uploads/2024/09/Blog-6-scaled.jpg", alt: "Dining Area" },

  ];

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handlePrevious = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1
      );
    }
  };

  const handleNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1
      );
    }
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  return (
    <div className="bg-gray-50 py-12 px-6">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        Stunning Gallery
      </h1>

      {/* Thumbnail Section */}
      <div className="flex justify-center items-center gap-5 overflow-x-auto no-scrollbar py-4">
        {images.map((image, index) => (
          <img
            key={image.id}
            src={image.src}
            alt={image.alt}
            className="w-64 h-40 object-cover rounded-lg shadow-lg hover:scale-110 transform transition duration-300 cursor-pointer"
            onClick={() => setSelectedImageIndex(index)}
          />
        ))}
      </div>

      {/* Lightbox */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative max-w-screen-lg w-full p-4">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white text-3xl hover:text-red-500 transition duration-300"
            >
              <FaTimes />
            </button>

            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-50 p-2 rounded-full hover:bg-gray-700 transition duration-300"
            >
              <FaArrowLeft />
            </button>

            {/* Image */}
            <img
              src={images[selectedImageIndex]?.src}
              alt={images[selectedImageIndex]?.alt}
              className="w-full max-h-[80vh] object-contain  shadow-lg hover:scale-90 transition-transform duration-500"
            />

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-50 p-2 rounded-full hover:bg-gray-700 transition duration-300"
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
