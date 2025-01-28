import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf"; // Import jsPDF for creating the PDF

const ConfirmationPage = () => {
  const { bookingId } = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/booking/${bookingId}`,
          { withCredentials: true }
        );
        setBookingDetails(response.data.data.booking);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (!bookingDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-500">Loading booking details...</p>
      </div>
    );
  }

  const { userDetails, hotelDetails, checkInDate, checkOutDate, totalAmount, room, adultCount } = bookingDetails;
// Function to generate PDF with hotel image
const generatePDF = () => {
  const doc = new jsPDF();

  // Set title for the PDF
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Booking Confirmation", 20, 20);

  // Add some space before the content
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("__________________________________________", 20, 25);

  // Hotel details section
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Hotel Details:", 20, 40);
  doc.setFont("helvetica", "normal");
  doc.text(`Hotel: ${hotelDetails.title}`, 20, 50);
  doc.text(`City: ${hotelDetails.city}`, 20, 60);
  doc.text(`Bill: ₹${totalAmount}`, 20, 70);
  doc.text(`Total Rooms: ${room}`, 20, 80);
  doc.text(`Adults: ${adultCount}`, 20, 90);
  doc.text(
    `Check-In Date: ${new Date(checkInDate).toLocaleDateString("en-GB").replace(/\//g, "-")}`,
    20,
    100
  );
  doc.text(
    `Check-Out Date: ${new Date(checkOutDate).toLocaleDateString("en-GB").replace(/\//g, "-")}`,
    20,
    110
  );

  // Insert hotel image if available
  const imageUrl = hotelDetails.image; // Image URL or Base64 string
  if (imageUrl) {
    const imageWidth = 180; // Set the image width
    const imageHeight = 100; // Set the image height

    // Add image to the PDF
    doc.addImage(imageUrl, "JPEG", 20, 120, imageWidth, imageHeight);
  }

  // Add some space between sections
  doc.text("__________________________________________", 20, 230);

  // Guest details section
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Guest Details:", 20, 240);
  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${userDetails.name}`, 20, 250);
  doc.text(`Email: ${userDetails.email}`, 20, 260);
  doc.text(`Phone: ${userDetails.phone}`, 20, 270);

  // Add footer (page number or other info)
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text("Thank you for booking with us!", 20, 280);

  // Save the generated PDF
  doc.save("booking_confirmation.pdf"); // Trigger the download
};


  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-700 p-6 text-white flex items-center justify-center">
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl text-gray-800 p-8">
      <h1 className="text-4xl font-extrabold text-center text-purple-600">
        Booking Confirmation
      </h1>
      <p className="text-center text-gray-500 mt-3">
        Your booking has been successfully confirmed. Find the details below:
      </p>
  
      <div className="mt-8 space-y-6">
        {/* Hotel Details Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Hotel Details</h2>
          <div className="flex flex-col md:flex-row gap-6 mt-4 items-center">
            <img
              src={hotelDetails.image}
              alt={hotelDetails.title}
              className="h-64 w-full md:w-1/2 object-cover rounded-xl shadow-lg"
            />
            <div className="w-full md:w-1/2 space-y-3">
              <p className="text-lg text-gray-700">
                <strong>Hotel Name:</strong> {hotelDetails.title}
              </p>
              <p className="text-lg text-gray-700">
                <strong>City:</strong> {hotelDetails.city}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Bill:</strong> ₹{totalAmount}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Total Rooms:</strong> {room}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Adults:</strong> {adultCount}
              </p>
            </div>
          </div>
        </div>
  
        {/* Dates Section */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-800">Stay Duration</h3>
          <p className="text-lg text-gray-700">
            <strong>Check-In Date:</strong>{" "}
            {new Date(checkInDate).toLocaleDateString("en-GB").replace(/\//g, "-")}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Check-Out Date:</strong>{" "}
            {new Date(checkOutDate).toLocaleDateString("en-GB").replace(/\//g, "-")}
          </p>
        </div>
  
        {/* Guest Details Section */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-800">Guest Details</h3>
          <p className="text-lg text-gray-700">
            <strong>Name:</strong> {userDetails.name}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Email:</strong> {userDetails.email}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Phone:</strong> {userDetails.phone}
          </p>
        </div>
      </div>
  
      {/* Action Buttons */}
      <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
        <button
          onClick={generatePDF}
          className="w-full md:w-auto px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl shadow-md hover:bg-purple-700 transition-all"
        >
          Download as PDF
        </button>
        <button
          onClick={() => navigate("/")}
          className="w-full md:w-auto px-6 py-3 bg-gray-600 text-white font-semibold rounded-xl shadow-md hover:bg-gray-700 transition-all"
        >
          Back to Home
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default ConfirmationPage;
