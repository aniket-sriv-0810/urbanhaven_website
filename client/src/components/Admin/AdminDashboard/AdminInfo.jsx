import React from "react";
import { FaUserShield, FaIdBadge, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const AdminInfo = ({ user }) => {
  return (
    <div
      className="bg-gray-100 shadow-lg rounded-2xl p-6 md:p-8 max-w-3xl mx-auto"
      data-aos="fade-up"
      id="admin-details"
    >
      <div className="flex items-center justify-center gap-4 mb-6 p-4">
        <FaUserShield className="text-blue-600 text-4xl" />
        <h2 className="text-3xl font-bold text-gray-900">Admin Credentials</h2>
        <NavLink to="/">
          <button className="flex gap-3 rounded-full text-white bg-gradient-to-r from-cyan-500 to-purple-900 p-4 shadow-lg hover:scale-110 transition">
            <IoHome className="text-xl" />
          </button>
        </NavLink>
      </div>

      <div className="bg-gray-100 p-5 rounded-lg shadow-md space-y-4">
        <AdminDetail icon={<FaIdBadge className="text-blue-500" />} label="Admin ID" value={user._id} />
        <AdminDetail icon={<FaUserShield className="text-green-500" />} label="Admin" value={user.name} />
        <AdminDetail icon={<FaPhoneAlt className="text-red-500" />} label="Phone" value={user.phone} />
        <AdminDetail icon={<FaEnvelope className="text-yellow-500" />} label="Email" value={user.email} />
      </div>
    </div>
  );
};

const AdminDetail = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 p-1 text-lg text-gray-800">
    {icon}
    <span>
      <strong>{label}:</strong> {value}
    </span>
  </div>
);

export default AdminInfo;
