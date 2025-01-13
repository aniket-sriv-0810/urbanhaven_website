import React, { useEffect, useState, useRef } from "react";

const Counter = ({ start = 0, end, duration = 2000, value, color }) => {
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
      className={`flex flex-col justify-center items-center shadow-md rounded-lg p-6 transition-transform transform hover:scale-105 hover:bg-gray-100  w-56 sm:w-64`}
    >
      <h1 className={`text-4xl font-bold text-${color}-500 `}>{count}+</h1>
      <p className="text-base text-gray-700 font-medium">{value}</p>
    </div>
  );
};

export default Counter;
