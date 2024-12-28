import React from "react";
import { FaShareAlt } from "react-icons/fa";

const ShareBtn = ({ hotelName, hotelLink }) => {
  const handleShare = async () => {
    const shareData = {
      title: `Check out this hotel: ${hotelName}`,
      text: `I found this amazing hotel called ${hotelName}. You can check it out here:`,
      url: hotelLink,
    };

    try {
      if (navigator.share) {
        // Use the Web Share API if available
        await navigator.share(shareData);
        alert("Hotel shared successfully!");
      } else {
        // Fallback for browsers without Web Share API
        navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing hotel:", error);
      alert("Failed to share the hotel. Please try again.");
    }
  };

  return (
   <div onClick={handleShare}>
      <FaShareAlt className="w-5 h-5  text-gray-200" />
      </div>
  );
};

export default ShareBtn;
