import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminHotel = () => {
    const [hotelDetails, setHotelDetails] = useState();
    
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/admin/hotels", {
        withCredentials: true,
      });
      console.log(response.data.data.allHotelDetails);
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
   <>
   <div className="admin-hotel-container">
   <h1 className="text-2xl font-bold text-center mb-6">Hotel Details</h1>
   {hotelDetails ? (
     <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-md rounded-lg">
       <thead className="bg-gray-200 text-center">
         <tr>
           <th className="border border-gray-300 px-4 py-2">Hotel Image</th>
           <th className="border border-gray-300 px-4 py-2">Title</th>
           <th className="border border-gray-300 px-4 py-2">Description</th>
           <th className="border border-gray-300 px-4 py-2">Price</th>
           <th className="border border-gray-300 px-4 py-2">City</th>
           <th className="border border-gray-300 px-4 py-2">State</th>
           <th className="border border-gray-300 px-4 py-2">Country</th>
         </tr>
       </thead>
       <tbody>
         {hotelDetails.map((hotelInfo) => (
           <tr key={hotelInfo._id} className="hover:bg-gray-100">
             <td className="border border-gray-300 px-4 py-2 text-center">
               <img
                 src={hotelInfo.image}
                 alt={hotelInfo.title}
                 className="w-16 h-16 rounded-full mx-auto object-cover border border-gray-300"
               />
             </td>
             <td className="border border-gray-300 px-4 py-2">{hotelInfo.title}</td>
             <td className="border border-gray-300 px-4 py-2">{hotelInfo.description}</td>
             <td className="border border-gray-300 px-4 py-2">Rs {hotelInfo.price}</td>
             <td className="border border-gray-300 px-4 py-2">{hotelInfo.city}</td>
             <td className="border border-gray-300 px-4 py-2">{hotelInfo.state}</td>
             <td className="border border-gray-300 px-4 py-2">{hotelInfo.country}</td>
           </tr>
         ))}
       </tbody>
     </table>
   ) : (
     <p className="text-center text-red-500 mt-6">No Hotel Found!</p>
   )}
 </div>
 </>
);

}

export default AdminHotel
