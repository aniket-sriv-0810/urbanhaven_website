import React from 'react'
import Logo from '../assets/webiste_full_logo.png';
import Navbar from '../components/Navbars/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
const AboutUs = () => {
  return (
    <>
    <div className='bg-gradient-to-r from-slate-600 to-slate-800'>
   <Navbar/>
    </div>
    <section className="bg-gradient-to-b from-gray-100 to-gray-50 text-gray-900">
      <div className="">
        {/* Heading */}
        <span className='flex flex-col sm:flex-row items-center justify-center'>
        <h1 className="text-2xl sm:text-3xl p-5 font-bold text-center mt-5 text-orange-500 animate-fadeInUp">
          Discover UrbanHaven Hotels
        </h1>
        <img
              src={Logo}
              alt="Our Logo"
              className="w-28 h-28 mt-4 bg-gray-100 rounded-full shadow-lg shadow-gray-600 sm:shadow-none  object-cover transform hover:scale-105 transition duration-500"
            />
            </span>
        <p className="text-base sm:text-lg text-center lg:m-auto p-5 text-gray-600 mb-12 leading-relaxed max-w-3xl ">
          Experience a perfect blend of luxury, comfort, and elegance at UrbanHaven Hotels. Whether you're on a business trip, a leisure vacation, or a quick getaway, we offer  handpicked accommodations designed to elevate your travel experience.
        </p>

        {/* Our Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative overflow-hidden rounded-2xl shadow-lg m-auto">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5aUKMF9Cdr68odtILWzFfFvF2fDjy2q8MFw&s"
              alt="Our Vision"
              className="w-80 h-80 object-cover transform hover:scale-105 transition duration-500"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl m-auto  font-bold w-max text-orange-700 mb-4">Our Vision</h2>
            <p className="text-base sm:text-lg md:text-left  text-center p-5 text-gray-600 mb-12 leading-relaxed max-w-3xl">
              At  UrbanHaven , we believe that every journey deserves  an unforgettable stay . Our goal is to connect travelers with  unique, stylish, and well-equipped accommodations , ranging from modern city escapes to peaceful countryside retreats.
            </p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
          <div className="flex flex-col justify-center order-2 md:order-1">
            <h2 className="text-3xl m-auto font-bold w-max text-orange-700 mb-4">Why Choose Us?</h2>
            <ul className="text-base sm:text-lg  flex flex-col gap-3  p-5 text-gray-600 mb-12 leading-relaxed max-w-3xl">
              <li><strong>Seamless Booking:</strong> A hassle-free, secure, and smooth reservation process.</li>
              <li><strong>Premium Stays:</strong> Verified accommodations with top-notch amenities.</li>
              <li><strong>Exclusive Offers:</strong> Best prices, discounts, and loyalty perks.</li>
              <li><strong>24/7 Customer Support:</strong> Our dedicated team is always here to assist you.</li>
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-2xl shadow-lg m-auto">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5aUKMF9Cdr68odtILWzFfFvF2fDjy2q8MFw&s"
              alt="Exceptional Experience"
              className="w-80 h-80 object-cover  transform hover:scale-105 transition duration-500"
            />
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="mt-16 bg-white shadow-xl rounded-xl p-8 max-w-4xl mx-auto text-center">
          <h3 className=" text-xl m-auto font-bold w-max text-teal-700 mb-4">What Our Guests Say</h3>
          <p className="text-gray-600 italic text-lg">"UrbanHaven made our trip extraordinary! The hotel was stunning, the service was impeccable, and we felt right at home. Highly recommend!"</p>
         
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-xl m-auto font-bold w-max text-gray-700 mb-4">Your Perfect Stay Awaits</h3>
          <p className="text-base mb-10 xs:mb-10 md:mb-10 text-center md:m-auto p-5 text-gray-600  leading-relaxed max-w-3xl">
            Browse through our curated selection of premium hotels and  find your perfect getaway . Your next memorable stay is just a click away!
          </p>
          <div className='mb-8 -mt-5'>
          <button
            className="bg-teal-600 w-max text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-500 transition duration-300 transform hover:scale-105"
          >
            Explore Stays
          </button>
          </div>
          
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default AboutUs;
