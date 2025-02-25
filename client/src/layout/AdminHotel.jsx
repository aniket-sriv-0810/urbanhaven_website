import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const AdminHotel = () => {
  const navigate = useNavigate();
  const [hotelDetails, setHotelDetails] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/v1/admin/hotels",
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
    <div className=" min-h-screen bg-gray-50 md:p-8">
      <h1 className="text-3xl font-semibold text-center pt-5 mb-6 text-gray-800">
        Hotel Details
      </h1>
      {hotelDetails ? (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-gray-800 text-white text-sm lg:text-base">
              <tr>
                <th className="border border-gray-200 px-4 py-3 font-medium text-center">
                  Hotel Image
                </th>
                <th className="border border-gray-200 px-4 py-3 font-medium text-center">
                  Title
                </th>
                <th className="border border-gray-200 px-4 py-3 font-medium text-center">
                  Price
                </th>
                <th className="border border-gray-200 px-4 py-3 font-medium text-center">
                  City
                </th>
                <th className="border border-gray-200 px-4 py-3 font-medium text-center">
                  State
                </th>
                <th className="border border-gray-200 px-4 py-3 font-medium text-center">
                  Country
                </th>
                <th className="border border-gray-200 px-4 py-3 font-medium text-center">
                  Edit Details
                </th>
                <th className="border border-gray-200 px-4 py-3  text-center">
                  Delete Hotel
                </th>
              </tr>
            </thead>
            <tbody>
              {hotelDetails.map((hotelInfo) => (
                <tr
                  key={hotelInfo._id}
                  className="hover:bg-zinc-600 hover:text-white text-gray-800 "
                >
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    <img
                      src={hotelInfo.image}
                      alt={hotelInfo.title}
                      className="w-12 h-12 shadow-lg shadow-gray-700 md:w-16 md:h-16 rounded-full mx-auto object-cover border border-gray-600"
                    />
                  </td>
                  <td className="border border-gray-200 px-4 py-2  text-center">
                    {hotelInfo.title}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                  ₹ {hotelInfo.price}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    {hotelInfo.city}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    {hotelInfo.state}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    {hotelInfo.country}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    <button
                      onClick={() =>
                        navigate(`/admin/hotel-details/${hotelInfo._id}/edit`)
                      }
                      className="flex items-center gap-x-3 bg-green-500 px-4 py-4 m-auto rounded-full text-white hover:bg-green-600 hover:scale-110 transition-colors"
                    >
                      <FaEdit />
                    </button>
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    <button
                      onClick={() =>
                        navigate(`/admin/hotel/${hotelInfo._id}/delete`)
                      }
                      className="flex items-center gap-x-2 m-auto bg-red-600 px-4 py-4 rounded-full text-white hover:bg-red-700 hover:scale-110 transition-colors"
                    >
                      <MdDeleteForever/>
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
