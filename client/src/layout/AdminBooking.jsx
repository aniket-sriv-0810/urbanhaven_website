import axios from "axios";
import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import BookingTable from "../components/Admin/AdminBooking/BookingTable";

const AdminBooking = () => {
  const [adminBookingData, setAdminBookingData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/v1/admin/bookings`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setAdminBookingData(response.data.data.bookingDetails);
      }
    } catch (error) {
      console.error("Failed to get booking information:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="admin-booking-container bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Booking Details
      </h1>
      {loading ? (
        <DotLottieReact
          src="https://lottie.host/470391a4-12cf-4fbc-bf5a-a6513c48cb55/h8hQRAkbcn.lottie"
          loop
          autoplay
          className="m-auto w-40 h-40"
        />
      ) : adminBookingData && adminBookingData.length > 0 ? (
        <BookingTable bookings={adminBookingData} />
      ) : (
        <p className="text-center text-red-500 mt-6">No Booking Found!</p>
      )}
    </div>
  );
};

export default AdminBooking;
