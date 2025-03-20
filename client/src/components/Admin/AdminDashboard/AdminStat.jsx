import React from "react";
import { FaHotel, FaUsers, FaClipboardList, FaComments } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminStat = ({ adminData }) => {
  const stats = [
    { id: "hotel-details", count: adminData.totalHotels || 0, label: "Hotels Listed", icon: <FaHotel className="text-cyan-600 text-5xl" />, link: "/admin/hotels" },
    { id: "users-btn", count: adminData.totalUsers || 0, label: "Users Registered", icon: <FaUsers className="text-green-500 text-5xl" />, link: "/admin/users" },
    { id: "bookings-btn", count: adminData.totalBookings || 0, label: "Bookings Confirmed", icon: <FaClipboardList className="text-red-500 text-5xl" />, link: "/admin/bookings" },
    { id: "contacts-btn", count: adminData.totalContacts || 0, label: "Feedbacks Received", icon: <FaComments className="text-orange-500 text-5xl" />, link: "/admin/contacts" },
  ];

  return (
    <div className=" p-5 sm:p-0 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 mt-10">
      {stats.map(({ id, count, label, icon, link }) => (
        <StatCard key={id} id={id} count={count} label={label} icon={icon} link={link} />
      ))}
    </div>
  );
};

const StatCard = ({ id, count, label, icon, link }) => (
  <div className="bg-white shadow-lg py-5  rounded-2xl flex  flex-col justify-center items-center hover:scale-110 transition transform hover:shadow-xl hover:shadow-gray-500" data-aos="zoom-in" id={id}>
    <div className="bg-gray-100 p-4 rounded-full shadow-md">{icon}</div>
    <h2 className="text-4xl font-extrabold text-gray-900 mt-4 mb-2">{count ? count: <div className="flex gap-2">
    <div className="w-6 h-6 md:w-6 md:h-6 rounded-full bg-gray-400 mx-auto animate-pulse"></div>
    <div className="w-6 h-6 md:w-6 md:h-6 rounded-full bg-gray-400 mx-auto animate-pulse"></div>
    <div className="w-6 h-6 md:w-6 md:h-6 rounded-full bg-gray-400 mx-auto animate-pulse"></div>
    </div>
    }</h2>
    <p className="text-gray-600 text-lg font-medium">{label}</p>
    <NavLink to={link}>
      <button className="rounded-2xl m-3 text-white bg-gradient-to-t from-cyan-500 to-purple-900 hover:from-teal-700 hover:to-green-500 px-8 py-3 shadow-lg hover:cursor-pointer hover:scale-110 transition">View Details</button>
    </NavLink>
  </div>
);

export default AdminStat;
