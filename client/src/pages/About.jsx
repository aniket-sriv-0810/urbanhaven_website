const AboutUs = () => {
  return (
    <section className="bg-gray-50 text-gray-800 py-16 px-6 md:px-16 lg:px-32">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-8 text-teal-600 animate-fadeIn">
          Welcome to UrbanHaven Hotels
        </h1>
        <p className="text-lg text-center text-gray-700 mb-8 leading-relaxed">
          Experience a seamless and luxurious stay with <span className="font-bold text-teal-600">UrbanHaven Hotels</span>. Whether you're traveling for business or leisure, we offer **handpicked accommodations** designed for comfort, elegance, and convenience.
        </p>

        {/* Section Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src="/images/mission.jpg"
              alt="Our Vision"
              className="w-full h-80 object-cover transform hover:scale-105 transition duration-500"
            />
          </div>
          
          {/* Text Section */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold text-teal-600 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              At UrbanHaven, we believe that every journey should be accompanied by **exceptional stays**. Our goal is to connect travelers with **unique, stylish, and well-equipped accommodations**—from urban boutique hotels to cozy countryside retreats.
            </p>
          </div>
        </div>

        {/* Second Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
          {/* Text Section */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold text-teal-600 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              We **redefine hospitality** by providing a seamless booking experience, competitive pricing, and world-class customer support. With **secure transactions** and **exclusive offers**, we make your stay effortless and memorable.
            </p>
          </div>

          {/* Image Section */}
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src="/images/experience.jpg"
              alt="Exceptional Experience"
              className="w-full h-80 object-cover transform hover:scale-105 transition duration-500"
            />
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Your Perfect Stay Awaits
          </h3>
          <p className="text-gray-600 text-base leading-relaxed mb-6">
            Browse through our curated selection of premium hotels and unique stays. **Luxury, comfort, and convenience**—all in one place.
          </p>
          <a
            href="/explore"
            className="bg-teal-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-teal-500 transition duration-300 transform hover:scale-105"
          >
            Book Your Stay Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
