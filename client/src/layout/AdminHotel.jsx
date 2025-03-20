import axios from "axios";
import React, { useEffect, useState } from "react";
import HotelTable from "../components/Admin/AdminHotel/HotelTable";
import SkeletonTable from "../components/LoadingSkeleton/SkeletonTable";

const AdminHotel = () => {
  const [hotelDetails, setHotelDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to store error message

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/v1/admin/hotels`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setHotelDetails(response.data.data.allHotelDetails);
      }
    } catch (error) {
      console.error("Failed to get hotel details:", error);
      setError(error.response?.data?.message || "Failed to fetch hotel details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 md:p-3">
      <h1 className="text-3xl font-semibold text-center pt-5 mb-6 text-gray-800">
        Hotel Details
      </h1>

      {loading ? (
        <div className="text-center text-gray-700">
          <SkeletonTable />
        </div>
      ) : error ? (
        <p className="text-center text-red-500 font-semibold mt-10">{error}</p>
      ) : hotelDetails && hotelDetails.length > 0 ? (
        <HotelTable hotels={hotelDetails} />
      ) : (
        <p className="text-center text-red-500 mt-6">No Hotel Details Found!</p>
      )}
    </div>
  );
};

export default AdminHotel;
