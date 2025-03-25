import React from "react";

const UserProfile = ({ user }) => {
  return (
    <div className="bg-gradient-to-t from-zinc-900 to-zinc-700 md:w-1/3 w-full p-6 flex items-center justify-center text-white">
      <div className="text-center space-y-6" data-aos="fade-down">
        {user && (
          <img
            src={user.image}
            alt={user.name}
            className="w-28 h-28 rounded-full bg-gray-100 border-4 border-white shadow-lg mx-auto"
          />
        )}
        <h1 className="text-3xl font-bold">{user ? user.name.toUpperCase() : "User Name"}</h1>
        <p className="text-lg font-light">{user?.email || "User Email"}</p>
      </div>
    </div>
  );
};

export default UserProfile;
