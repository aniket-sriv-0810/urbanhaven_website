import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf"; // Import jsPDF for creating the PDF
import { FaHotel, FaMapMarkerAlt, FaRupeeSign, FaBed, FaUserFriends, FaCalendarCheck, FaUser, FaEnvelope, FaPhoneAlt, FaFileDownload, FaHome } from "react-icons/fa";
import SkeletonCard from "../../components/LoadingSkeleton/SkeletonCard";


const ConfirmationPage = () => {
  const { bookingId } = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);
  const navigate = useNavigate();
  const [loading , setLoading] = useState(false);
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/hotels/v1/booking/${bookingId}`,
          { withCredentials: true }
        );
        setBookingDetails(response.data.data.booking);
      } catch (error) {
        setLoading(false);
      }finally{
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (!bookingDetails) {
    return (
       <div className="flex justify-center items-center mt-10 "> <SkeletonCard/></div>
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
  doc.text(`Total Amount: Rs ${(totalAmount).toLocaleString("INR")}`, 20, 70);
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

if(loading) return <div className="flex justify-center items-center mt-10 "> <SkeletonCard/></div>

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 p-3 xs:p-3 flex items-center justify-center text-white">
      <div className="w-full max-w-3xl bg-gray-800 rounded-2xl shadow-2xl p-2 md:p-5  space-y-8">
        <h1 className="text-2xl mt-2  md:text-4xl font-bold text-center text-green-400">🎉 Booking Confirmed!</h1>
        <p className="text-center text-gray-300 text-sm">Your stay is successfully booked. Check your details below.</p>

        {/* Hotel Details */}
        <div className="p-6 bg-gray-700 rounded-xl shadow-md">
          <h2 className="text-2xl  font-semibold text-indigo-300 flex items-center justify-center gap-2"><FaHotel /> Hotel Details</h2>
          <div className="flex flex-col md:flex-row gap-6 mt-4 items-center ">
            <img src={hotelDetails.image} alt={hotelDetails.title} className="h-56 w-full md:w-1/2 object-cover rounded-xl shadow-md" />
            <div className="w-full md:w-1/2 space-y-3 text-lg font-semibold">
              <p className="flex items-center gap-2"><FaHotel /><span>Hotel</span> {hotelDetails.title}</p>
              <p className="flex items-center gap-2"><FaMapMarkerAlt /><span>City:</span> {hotelDetails.city}</p>
              <p className="flex items-center gap-2"><FaRupeeSign /><span>Bill:</span> ₹ {(totalAmount).toLocaleString("INR")}</p>
              <p className="flex items-center gap-2"><FaBed /><span>Rooms:</span> {room}</p>
              <p className="flex items-center gap-2"><FaUserFriends /><span>Adults:</span> {adultCount}</p>
            </div>
          </div>
        </div>

        {/* Dates Section */}
        <div className="p-6 bg-gray-700 rounded-xl shadow-md flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex flex-col justify-start items-start gap-2  text-center md:text-left">
            <h3 className="text-xl font-semibold text-indigo-300 flex items-center gap-2 justify-center md:justify-start"><FaCalendarCheck /> Stay Duration</h3>
            <p className="my-2 text-lg"><strong>Check-In:</strong> {new Date(checkInDate).toLocaleDateString("en-GB").replace(/\//g, "-")}</p>
            <p className="text-lg"><strong>Check-Out:</strong> {new Date(checkOutDate).toLocaleDateString("en-GB").replace(/\//g, "-")}</p>
          </div>
        </div>

          {/* Guest Details Section */}
          <div className="p-6 bg-gray-700 rounded-xl shadow-md flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex flex-col justify-start items-start text-center   md:text-left">
            <h3 className="text-xl mb-3 font-semibold text-indigo-300 flex items-center gap-2 justify-center md:justify-start"><FaUser /> Guest Details</h3>
            <p className="my-2 text-lg flex items-center gap-2 justify-start"><FaUser /><strong className="hidden md:block">Name:</strong> {userDetails.name}</p>
            <p className="my-2 text-lg flex items-center gap-2 justify-start"><FaEnvelope /><strong className="hidden md:block">Email:</strong> {userDetails.email}</p>
            <p className="my-2 text-lg flex items-center gap-2 justify-start"><FaPhoneAlt /><strong className="hidden md:block">Phone:</strong> {userDetails.phone}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col p-4 sm:flex-row gap-4 justify-center">
          <button onClick={generatePDF} className="w-full md:w-auto px-6 py-3 bg-indigo-500 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-600 transition-all flex items-center justify-center gap-2">
            <FaFileDownload /> Download PDF
          </button>
          <button onClick={() => navigate("/")} className="w-full md:w-auto px-6 py-3 bg-gray-500 text-white font-semibold rounded-xl shadow-md hover:bg-gray-600 transition-all flex items-center justify-center gap-2">
            <FaHome /> Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
