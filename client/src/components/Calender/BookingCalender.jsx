import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main CSS file
import "react-date-range/dist/theme/default.css"; // Theme CSS file

const BookingCalendar = ({ onDateSelect }) => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setRange([ranges.selection]);
    onDateSelect(ranges.selection);
  };

  return (
    <DateRange
      editableDateInputs={true}
      onChange={handleSelect}
      moveRangeOnFirstSelection={false}
      ranges={range}
      minDate={new Date()} // Prevent past date bookings
    />
  );
};

export default BookingCalendar;
