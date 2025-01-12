import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ConfirmationPage = () => {
  const { bookingId } = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    // Fetch booking details from the backend
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/booking/${bookingId}`,
            {withCredentials:true}
        );
        console.log("Value 1 = " ,response);
        console.log("Value 2 = " ,response.data);
        
        setBookingDetails(response.data.data.booking);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (!bookingDetails) return <p>Loading booking details...</p>;



  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-center">Booking Confirmation</h1>
      <div className="mt-8 bg-white shadow-md p-4 rounded-lg max-w-xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">{bookingDetails.userDetails}</h2>
        <h2 className="text-xl font-semibold mb-4">{bookingDetails.userDetails}</h2>
        <h2 className="text-xl font-semibold mb-4">{bookingDetails.userDetails}</h2>
        <p className="text-gray-600"> {bookingDetails.hotelDetails.title}</p>
        <p className="text-gray-600"> {bookingDetails.hotelDetails.city}</p>
        
        <p className="text-gray-600">
          <strong>Booking Date:</strong> {new Date(bookingDetails.checkInDate).toLocaleDateString()}
        </p>
       
      </div>
    </div>
  );
};

export default ConfirmationPage;
