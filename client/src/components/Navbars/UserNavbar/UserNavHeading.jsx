import React from "react";

const UserNavHeading = ({ user }) => {
  return (
    <h1 className="hidden sm:text-lg xs:block lg:hidden xl:block text-white font-semibold truncate">
      {user ? `Welcome, ${user.name} to UrbanHaven!` : "Welcome to UrbanHaven!"}
    </h1>
  );
};

export default UserNavHeading;
