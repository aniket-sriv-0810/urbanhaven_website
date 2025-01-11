import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-6">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">About Us</h1>
        <div className="space-y-6">
          <p className="text-gray-600 text-lg leading-7">
            Welcome to our platform! We aim to redefine the way people book accommodations and explore new destinations.
            Whether you’re planning a weekend getaway or a month-long vacation, our user-friendly platform helps you
            find the perfect place to stay. Inspired by the best in the industry, we blend convenience, affordability,
            and trust to create a memorable experience.
          </p>
          <p className="text-gray-600 text-lg leading-7">
            With thousands of properties across cities, we ensure you have access to comfortable and verified stays.
            From budget-friendly options to luxurious villas, we cater to a wide range of preferences and budgets.
          </p>
          <p className="text-gray-600 text-lg leading-7">
            Our mission is simple: to make travel seamless, enjoyable, and accessible to everyone. Thank you for choosing
            us as your travel companion!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
