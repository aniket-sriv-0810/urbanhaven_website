import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { differenceInDays } from 'date-fns';

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
      alert('Please select both check-in and check-out dates.');
      return;
    }
    if (!validateGuests()) {
      alert('Each room must have up to 3 adults and 2 infants only.');
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
    <div className="p-6">
      <h2 className="text-xl font-bold">Book Your Stay</h2>
      <div>
        <label>Check-In Date:</label>
        <DatePicker
          selected={checkInDate}
          onChange={setCheckInDate}
          minDate={new Date()}
          placeholderText="Select check-in date"
        />
      </div>
      <div>
        <label>Check-Out Date:</label>
        <DatePicker
          selected={checkOutDate}
          onChange={setCheckOutDate}
          minDate={checkInDate || new Date()}
          placeholderText="Select check-out date"
        />
      </div>
      <div>
        <label>Rooms:</label>
        <button onClick={handleAddRoom} disabled={rooms >= 4}>
          Add Room
        </button>
        <p>Total Rooms: {rooms}</p>
      </div>
      {guests.map((room, index) => (
        <div key={index}>
          <p>Room {index + 1}</p>
          <label>Adults:</label>
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
          />
          <label>Infants:</label>
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
          />
        </div>
      ))}
      <button onClick={handleSubmit}>Book Now</button>
    </div>
  );
};

export default BookingCalender;
