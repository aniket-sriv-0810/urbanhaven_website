import React from "react";
import Logo from "../../assets/webiste_full_logo.png";
import Navbar from "../../components/Navbars/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const AboutUs = () => {
  return (
    <>
      {/* Navbar */}
      <div className="bg-gradient-to-r from-slate-600 to-slate-800">
        <Navbar />
      </div>

      {/* Main Section */}
      <section className="bg-gradient-to-b from-gray-100 to-gray-50 text-gray-900 py-10">
        <div className="container mx-auto px-5">
          {/* Heading Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-500 animate-fadeInUp">
              Discover UrbanHaven Hotels
            </h1>
            <img
              src={Logo}
              alt="Our Logo"
              className="w-28 h-28 mt-4 sm:ml-5 bg-gray-100 rounded-full shadow-lg object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <p className="text-base sm:text-lg text-center mx-auto p-5 text-gray-600 leading-relaxed max-w-3xl">
            Experience a perfect blend of luxury, comfort, and elegance at
            UrbanHaven Hotels. Whether you're on a business trip, a leisure
            vacation, or a quick getaway, we offer handpicked accommodations
            designed to elevate your travel experience.
          </p>

          {/* Our Vision Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5aUKMF9Cdr68odtILWzFfFvF2fDjy2q8MFw&s"
                alt="Our Vision"
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl lg:text-3xl font-bold text-orange-700 mb-4">
                Our Vision
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                At UrbanHaven, we believe that every journey deserves an
                unforgettable stay. Our goal is to connect travelers with unique,
                stylish, and well-equipped accommodations, ranging from modern
                city escapes to peaceful countryside retreats.
              </p>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
            <div className="text-center md:text-left order-2 md:order-1">
              <h2 className="text-2xl lg:text-3xl font-bold text-orange-700 mb-4">
                Why Choose Us?
              </h2>
              <ul className="text-base sm:text-lg space-y-3 text-gray-600">
                <li>
                  <strong>✅ Seamless Booking:</strong> A hassle-free, secure,
                  and smooth reservation process.
                </li>
                <li>
                  <strong>🏨 Premium Stays:</strong> Verified accommodations
                  with top-notch amenities.
                </li>
                <li>
                  <strong>💰 Exclusive Offers:</strong> Best prices, discounts,
                  and loyalty perks.
                </li>
                <li>
                  <strong>📞 24/7 Support:</strong> Our dedicated team is always
                  here to assist you.
                </li>
              </ul>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg order-1 md:order-2">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5aUKMF9Cdr68odtILWzFfFvF2fDjy2q8MFw&s"
                alt="Why Choose Us?"
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="mt-16 bg-white shadow-xl rounded-xl p-8 max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-teal-700 mb-4">
              What Our Guests Say
            </h3>
            <p className="text-gray-600 italic text-lg">
              "UrbanHaven made our trip extraordinary! The hotel was stunning,
              the service was impeccable, and we felt right at home. Highly
              recommend!"
            </p>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">
              Your Perfect Stay Awaits
            </h3>
            <p className="text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Browse through our curated selection of premium hotels and find
              your perfect getaway. Your next memorable stay is just a click
              away!
            </p>
            <button className="mt-6 bg-teal-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-500 transition duration-300 transform hover:scale-105">
              Explore Stays
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default AboutUs;
