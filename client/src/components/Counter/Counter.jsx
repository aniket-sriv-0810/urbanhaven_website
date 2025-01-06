import React, { useEffect, useState } from "react";

const Counter = ({ start = 0, end, duration = 2000 , value}) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    const increment = (end - start) / (duration / 100);
    let currentCount = start;

    const interval = setInterval(() => {
      currentCount += increment;
      if (currentCount >= end) {
        currentCount = end;
        clearInterval(interval);
      }
      setCount(Math.ceil(currentCount));
    }, 100);

    return () => clearInterval(interval);
  }, [start, end, duration]);

  return (
    <div className="flex justify-center items-center">
      <div className="text-center space-y-4">
         <h1 className="text-3xl lg:pl-6 sm:text-4xl md:text-5xl font-bold text-blue-500">
         {count}+
       </h1>
        <p className="text-lg text-gray-600">{value}</p>
      </div>
    </div>
  );
};

export default Counter;
