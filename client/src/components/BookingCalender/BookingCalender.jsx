import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInDays } from "date-fns";

const BookingCalender = ({ handleBooking }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState([{ adults: 1, infants: 0 }]);

  const calculateNights = () =>
    checkInDate && checkOutDate
      ? differenceInDays(checkOutDate, checkInDate)
      : 0;

  const validateGuests = () =>
    guests.every(
      (room) =>
        room.adults <= 3 && room.adults > 0 && room.infants >= 0 && room.infants <= 2
    );

  const handleAddRoom = () => {
    if (rooms < 4) {
      setRooms((prev) => prev + 1);
      setGuests((prev) => [...prev, { adults: 1, infants: 0 }]);
    }
  };

  const handleSubmit = () => {
    if (!checkInDate || !checkOutDate) {
      alert("Please select both check-in and check-out dates.");
      return;
    }
    if (!validateGuests()) {
      alert("Each room must have up to 3 adults and 2 infants only.");
      return;
    }
    handleBooking({
      checkInDate,
      checkOutDate,
      rooms,
      guests,
      nights: calculateNights(),
    });
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-md w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Book Your Stay</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Check-In Date:
        </label>
        <DatePicker
          selected={checkInDate}
          onChange={setCheckInDate}
          minDate={new Date()}
          placeholderText="Select check-in date"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Check-Out Date:
        </label>
        <DatePicker
          selected={checkOutDate}
          onChange={setCheckOutDate}
          minDate={checkInDate || new Date()}
          placeholderText="Select check-out date"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rooms:
        </label>
        <div className="flex items-center gap-4">
          <button
            onClick={handleAddRoom}
            disabled={rooms >= 4}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
          >
            Add Room
          </button>
          <p className="text-gray-700">Total Rooms: {rooms}</p>
        </div>
      </div>
      {guests.map((room, index) => (
        <div key={index} className="mb-4 p-4 bg-gray-100 rounded-md">
          <p className="font-medium text-gray-800 mb-2">Room {index + 1}</p>
          <div className="flex items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adults:
              </label>
              <input
                type="number"
                value={room.adults}
                min="1"
                max="3"
                onChange={(e) =>
                  setGuests((prev) =>
                    prev.map((r, i) =>
                      i === index ? { ...r, adults: parseInt(e.target.value) } : r
                    )
                  )
                }
                className="w-16 border border-gray-300 rounded-md p-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Infants:
              </label>
              <input
                type="number"
                value={room.infants}
                min="0"
                max="2"
                onChange={(e) =>
                  setGuests((prev) =>
                    prev.map((r, i) =>
                      i === index ? { ...r, infants: parseInt(e.target.value) } : r
                    )
                  )
                }
                className="w-16 border border-gray-300 rounded-md p-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Book Now
      </button>
    </div>
  );
};

export default BookingCalender;
