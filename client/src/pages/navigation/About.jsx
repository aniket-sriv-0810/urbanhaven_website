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
        <div className=" mx-auto px-5" >
          {/* Header Section */}
          <AboutHeader />

          {/* Our Vision */}


          <AboutSection
            title="Our Vision"
            text="At UrbanHaven, we believe that every journey deserves an unforgettable stay. Our goal is to connect travelers with unique, stylish, and well-equipped accommodations, ranging from modern city escapes to peaceful countryside retreats."
            imageUrl="https://media-hosting.imagekit.io//d35727a89c01449d/white-nature-hotel-travel-beautiful-min.jpg?Expires=1836970376&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=S4ztzIN7sAw8Bc2XOqFeY8TocJ-dAE2dy33-9b7ZGgK73LTd-G~DFPYY4mZUpN2GhlUxAUCUEibS3-pXVdnFkdmAjCST2s7JtVUVZSZNM-OYepOjeKK1pDOCL4xtaRThNGCl6coMHwNF2UgdQzD1rybHhRFgERrnTlZp4Nz6PIH6Hx8pPNW~VZm7OxG9w6K9cSIGgGXHjGOKctW5RDxqFxkekeDLuEeDmEdjYKEtGRQsGIhDiq42ig-fS8qoOOWe0-3~KGZKu-48bcshRnceS2cUIS-oZIn0zxzHf202ShvG27lVZYhgCKuf3qpmZibqRYV99sWDGD7Ypi~YwkLp8g__"
          />


          {/* Why Choose Us */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16" >
            <div className="order-2 md:order-1" >
              <WhyChooseUs />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg order-1 md:order-2">
              <img
                src="https://media-hosting.imagekit.io//169a4a2bcf384dc8/beautiful-embankment-walking-sport-amara-dolce-vita-luxury-hotel-alanya-turkey-min.jpg?Expires=1836970416&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=hiOexw-8Gsiy3Ft16ReHzMcqFEztE6SKH5TDEwGtjoP1ZgTYPFrY8H6lIJ~i0WEc7H6D8ljXxrnDOpXjBKZDW128rFDh9Zun-dC9pn~r6TO4Mw~~VOo-LkdYWwuqgH9ZuFsJczt9GmLS84CHjt7C20ShtZ7GUN1qCvwT-0GSbLIMJWjDghbut7P2BsGz9MdW1OshrpS6BWHMkVmNvSnUtAT9kCI42VicfnESE2BaR1uXHOs65E0fKATzvKkBx5jGbm12Misn~fQhKcOMPLXZFgWETgOzJ8x~mRBUo9WNH~DVMkJNhiLXSHJF44s7nq6CCJCnB4BkxuIPFRAEicfvyg__"
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
