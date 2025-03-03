import React from "react";

const UserProfile = ({ user }) => {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-700 md:w-1/3 w-full p-6 flex items-center justify-center text-white">
      <div className="text-center space-y-6">
        {user && (
          <img
            src={user.image}
            alt={user.name}
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg mx-auto"
          />
        )}
        <h1 className="text-3xl font-bold">{user ? user.name.toUpperCase() : "User Name"}</h1>
        <p className="text-lg font-light">{user?.email || "User Email"}</p>
      </div>
    </div>
  );
};

export default UserProfile;
