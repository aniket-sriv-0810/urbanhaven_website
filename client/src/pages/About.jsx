
  // Import necessary libraries
import React from 'react';
// import Image1 from '../assets/about-2.jpg';
// import Image2 from '../assets/about-3.jpg';
// import Image3 from '../assets/about-4.jpg';
// Define the About Us component
const AboutUs = () => {
  return (
    <section className="bg-gray-100 text-gray-800 py-16 px-6 md:px-16 lg:px-32">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-teal-600">
          About UrbanHaven Hotels
        </h1>
        <p className="text-lg text-center text-gray-700 mb-8 leading-relaxed">
          Welcome to <span className="font-bold text-teal-600">UrbanHaven Hotels</span>, your ultimate destination for finding comfort anywhere, anytime. Inspired by the innovative models of platforms like OYO and Airbnb, we are here to revolutionize the way you experience travel and hospitality. 
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Section 1 */}
          
          {/* Image Section 1 */}
          <div>
          {/* <img
          src={Image1}
          alt="UrbanHaven Mission"
          className="rounded-lg shadow-md  h-auto object-cover "
          /> */}
          </div>
          
          {/* Image Section 2 */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold text-teal-600 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              At UrbanHaven, we aim to connect travelers with unique, affordable, and comfortable stays worldwide. Whether you’re exploring bustling cities or seeking serene retreats, we ensure you find your perfect haven with ease.
            </p>
          </div>
         

          {/* Section 2 */}
          <div className='flex '>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold text-teal-600 mb-4">
              What Makes Us Special
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              We provide a seamless booking experience, secure transactions, and personalized options tailored to meet your needs. From chic urban apartments to cozy countryside lodges, our platform guarantees unmatched quality and variety.
            </p>
          </div>
        </div>
        <div>
        {/* <img
          src={Image2}
          alt="UrbanHaven Experience"
          className="rounded-lg shadow-md "
        /> */}
      </div>
      </div>
        
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Section 1 */}
      
      {/* Image Section 1 */}
      <div>
      {/* <img
      src={Image3}
      alt="UrbanHaven Mission"
      className="rounded-lg shadow-md  h-auto object-cover "
      /> */}
      </div>
      
      {/* Image Section 2 */}
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl font-semibold text-teal-600 mb-4">
          Our Mission
        </h2>
        <p className="text-gray-700 text-base leading-relaxed">
          At UrbanHaven, we aim to connect travelers with unique, affordable, and comfortable stays worldwide. Whether you’re exploring bustling cities or seeking serene retreats, we ensure you find your perfect haven with ease.
        </p>
      </div>
      </div>


        <div className="text-center mt-16">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Ready to Explore?
          </h3>
          <p className="text-gray-600 text-base leading-relaxed mb-6">
            Discover the best places to stay with UrbanHaven Hotels and make your travels memorable. Wherever you go, we ensure comfort is just a booking away.
          </p>
          <a
            href="/explore"
            className="bg-teal-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-teal-500 transition duration-300"
          >
            Start Exploring
          </a>
        </div>
      </div>
     
    </section>
    
  );
};

export default AboutUs;
