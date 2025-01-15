import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminHotel = () => {
  const navigate = useNavigate();
  const [hotelDetails, setHotelDetails] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/admin/hotels",
        { withCredentials: true }
      );
      if (response.status === 200) {
        setHotelDetails(response.data.data.allHotelDetails);
      }
    } catch (error) {
      console.error("Failed to get hotel details", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="admin-hotel-container min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Hotel Details
      </h1>
      {hotelDetails ? (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-indigo-600 text-white text-sm lg:text-base">
              <tr>
                <th className="border border-gray-200 px-4 py-3 text-left">
                  Hotel Image
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left">
                  Title
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left">
                  Description
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left">
                  Price
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left">
                  City
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left">
                  State
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left">
                  Country
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left">
                  Edit Details
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left">
                  Delete Hotel
                </th>
              </tr>
            </thead>
            <tbody>
              {hotelDetails.map((hotelInfo) => (
                <tr
                  key={hotelInfo._id}
                  className="hover:bg-gray-100 text-gray-800"
                >
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    <img
                      src={hotelInfo.image}
                      alt={hotelInfo.title}
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full mx-auto object-cover border border-gray-300"
                    />
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-left">
                    {hotelInfo.title}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-left">
                    {hotelInfo.description}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-left">
                    Rs {hotelInfo.price}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-left">
                    {hotelInfo.city}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-left">
                    {hotelInfo.state}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-left">
                    {hotelInfo.country}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    <button
                      onClick={() =>
                        navigate(`/admin/hotel-details/${hotelInfo._id}/edit`)
                      }
                      className="bg-green-500 px-4 py-2 rounded-lg text-white hover:bg-green-600 transition-colors"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    <button
                      onClick={() =>
                        navigate(`/admin/hotel/${hotelInfo._id}/delete`)
                      }
                      className="bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-red-500 mt-6">No Hotel Found!</p>
      )}
    </div>
  );
};

export default AdminHotel;
