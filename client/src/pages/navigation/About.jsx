import React from "react";
import Navbar from "../../components/Navbars/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import AboutHeader from "../../components/Navigation/About/AboutHeader";
import AboutSection from "../../components/Navigation/About/AboutSection";
import WhyChooseUs from "../../components/Navigation/About/WhyChooseUs";
import Testimonial from "../../components/Navigation/About/Testimonial";
import CallToAction from "../../components/Navigation/About/CallToAction";

const About = () => {
  return (
    <>
      {/* Navbar */}
      <div className="bg-gradient-to-r from-slate-600 to-slate-800">
        <Navbar />
      </div>

      {/* Main Section */}
      <section className="bg-gradient-to-b from-gray-100 to-gray-50 text-gray-900 py-10">
        <div className="container mx-auto px-5">
          {/* Header Section */}
          <AboutHeader />

          {/* Our Vision */}
          <AboutSection
            title="Our Vision"
            text="At UrbanHaven, we believe that every journey deserves an unforgettable stay. Our goal is to connect travelers with unique, stylish, and well-equipped accommodations, ranging from modern city escapes to peaceful countryside retreats."
            imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5aUKMF9Cdr68odtILWzFfFvF2fDjy2q8MFw&s"
          />

          {/* Why Choose Us */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
            <div className="order-2 md:order-1">
              <WhyChooseUs />
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
          <Testimonial />

          {/* Call to Action */}
          <CallToAction />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default About;
