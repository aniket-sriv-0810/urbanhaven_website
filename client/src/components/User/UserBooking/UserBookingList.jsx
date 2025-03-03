import React from "react";
import UserBookingCard from "./UserBookingCard";

const UserBookingList = ({ bookings }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {bookings.length > 0 ? (
        bookings.map((booking) => <UserBookingCard key={booking._id} booking={booking} />)
      ) : (
        <p className="text-center text-lg font-semibold text-gray-700">No bookings found.</p>
      )}
    </div>
  );
};

export default UserBookingList;
