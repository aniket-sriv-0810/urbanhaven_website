import React from "react";
import UserBookingCard from "./UserBookingCard";

const UserBookingList = ({ bookings, onCancel }) => {
  if (!bookings || bookings.length === 0) {
    return <p className="text-center text-gray-600">No bookings found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookings.map((booking) => (
        <UserBookingCard key={booking._id} booking={booking} onCancel={onCancel} />
      ))}
    </div>
  );
};

export default UserBookingList;
