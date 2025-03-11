import React from "react";

const UserDetailsForm = ({ user }) => {
  return (
    <form className="grid grid-cols-1 lg:grid-cols-2 gap-6 " data-aos="fade-down">
      {/* User ID */}
      <div>
        <label htmlFor="id" className="block text-sm font-medium text-gray-600">
          User ID
        </label>
        <input
          type="text"
          id="id"
          value={user._id}
          readOnly
          className="w-full text-gray-800 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-600">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={user.name}
          readOnly
          className="w-full text-gray-800 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Username */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-600">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={user.username}
          readOnly
          className="w-full text-gray-800 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
          Phone
        </label>
        <input
          type="text"
          id="phone"
          value={user.phone}
          readOnly
          className="w-full text-gray-800 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Email */}
      <div className="md:col-span-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={user.email}
          readOnly
          className="w-full text-gray-800 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </form>
  );
};

export default UserDetailsForm;
