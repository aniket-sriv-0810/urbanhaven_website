import axios from "axios";
import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const AdminBooking = () => {
  const [adminBookingData, setAdminBookingData] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading animation

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/admin/bookings",
        { withCredentials: true }
      );
      if (response.status === 200) {
        setAdminBookingData(response.data.data.bookingDetails);
      }
    } catch (error) {
      console.error("Failed to get booking information:", error);
    } finally {
      setTimeout(() => {
        setLoading(false); // Stop loading after 2 seconds
      }, 2000);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="admin-booking-container bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
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
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-indigo-600 text-white text-sm lg:text-base">
              <tr>
                <th colSpan="3" className="border border-gray-300 px-4 py-3">
                  Booked By
                </th>
                <th colSpan="3" className="border border-gray-300 px-4 py-3">
                  Hotel Details
                </th>
                <th
                  rowSpan="2"
                  className="border border-gray-300 px-4 py-3"
                >
                  Check-in Date
                </th>
                <th
                  rowSpan="2"
                  className="border border-gray-300 px-4 py-3"
                >
                  Check-out Date
                </th>
                <th
                  rowSpan="2"
                  className="border border-gray-300 px-4 py-3"
                >
                  Payment Mode
                </th>
                <th
                  rowSpan="2"
                  className="border border-gray-300 px-4 py-3"
                >
                  Payment Status
                </th>
              </tr>
              <tr>
                <th className="border border-gray-300 px-4 py-3">Name</th>
                <th className="border border-gray-300 px-4 py-3">Phone</th>
                <th className="border border-gray-300 px-4 py-3">Email</th>
                <th className="border border-gray-300 px-4 py-3">Image</th>
                <th className="border border-gray-300 px-4 py-3">Title</th>
                <th className="border border-gray-300 px-4 py-3">City</th>
              </tr>
            </thead>
            <tbody>
              {adminBookingData.map((bookingInfo) => (
                <tr
                  key={bookingInfo._id}
                  className="hover:bg-gray-100 text-gray-800"
                >
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {bookingInfo.userDetails?.name || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {bookingInfo.userDetails?.phone || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {bookingInfo.userDetails?.email || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <img
                      src={bookingInfo.hotelDetails?.image}
                      alt={bookingInfo.hotelDetails?.title || "Hotel Image"}
                      className="w-16 h-16 object-cover m-auto rounded-md border"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {bookingInfo.hotelDetails?.title || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {bookingInfo.hotelDetails?.city || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {new Date(bookingInfo.checkInDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {new Date(bookingInfo.checkOutDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {bookingInfo.paymentDetails}
                  </td>
                  <td
                    className={`border border-gray-300 px-4 py-2 text-center font-bold ${
                      bookingInfo.status === "Confirmed"
                        ? "bg-green-500 text-white"
                        : bookingInfo.status === "Pending"
                        ? "bg-yellow-500 text-white"
                        : bookingInfo.status === "Cancelled"
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {bookingInfo.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-red-500 mt-6">No Booking Found!</p>
      )}
    </div>
  );
};

export default AdminBooking;
