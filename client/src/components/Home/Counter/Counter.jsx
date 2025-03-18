import React, { useEffect, useState, useRef } from "react";

const Counter = ({ start, end, duration, value, color, icon }) => {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect(); // Disconnect observer after it has triggered
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (observer && observer.disconnect) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

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
  }, [hasStarted, start, end, duration]);

  return (
    <div
    ref={ref}
    className="flex flex-col justify-center items-center shadow-lg rounded-2xl p-4 transition-transform transform hover:scale-105 bg-white hover:bg-gray-100 w-36 md:w-40 lg:w-52 xl:w-60 text-center"
  >
    <div className="flex items-center  justify-center mb-3">
      {icon}
    </div>
    <h1 className={`text-lg sm:text-xl md:text-2xl xl:text-4xl font-extrabold text-${color}-500`}>
      {count}+
    </h1>
    <p className="text-sm lg:text-lg text-gray-700 font-semibold">{value}</p>
  </div>
  );
};

export default Counter;
