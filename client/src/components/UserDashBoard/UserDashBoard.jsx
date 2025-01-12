import React from "react";

const UserDashBoard = ({ closeMenu }) => {
  return (
    <div className="w-full h-full">
      <ul className="space-y-5 ">
        {["Details", "Wishlist", "My Bookings", "Logout", "Delete Account"].map((item, index) => (
          <li
            key={index}
            className="text-center bg-purple-500 hover:bg-purple-600 text-white py-4 rounded-lg shadow-md cursor-pointer"
            onClick={closeMenu} // Close the drawer when an item is clicked
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashBoard;
