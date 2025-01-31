import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Banner from "../assets/banner.png";
import { FaSearchLocation } from "react-icons/fa";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaHotel } from "react-icons/fa6";
import { TbListDetails } from "react-icons/tb";
import "react-toastify/dist/ReactToastify.css";
import LikeBtn from "../components/LikeBtn/LikeBtn";
import ShareBtn from "../components/ShareBtn/ShareBtn";
import CurrencyExchange from "../components/CurrencyExchange/CurrencyExchange";
import Navbar from "../components/Navbars/Navbar/Navbar";
import Counter from "../components/Counter/Counter";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import ScrollComponent from "../components/ScollComponent/ScrollComponent";
import FAQs from "../components/FAQs/FAQs";
import Blogs from "../components/Blogs/Blogs";
import SortHotels from "../components/SortHotels/SortHotels";

import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles



const currencySymbols = {
  INR: "₹",
  USD: "$",
  EURO: "€",
  POUND: "£",
};

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [hotel, setHotel] = useState([]);
  const [conversionRate, setConversionRate] = useState(1); // Default conversion rate for INR
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Default for larger screens
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    AOS.init({
      offset: 60, // Start animation after scrolling 100px
      duration: 1500, // Animation duration
      easing: "ease-in-out", // Smooth effect
      mirror:true,
      once: false, // Animation repeats on scroll
    });
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/", {
        withCredentials: true,
      });

      console.log(response.data);
      setHotel(response.data.data.allHotel);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // Adjust items per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1024) setItemsPerPage(4); // For larger screens
      else if (width > 768) setItemsPerPage(3); // For medium screens
      else if (width > 480) setItemsPerPage(2); // For smaller screens
      else setItemsPerPage(2); // For very small devices
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Paginate hotels
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHotels = hotel.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination navigation
  const totalPages = Math.ceil(hotel.length / itemsPerPage);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchData();
  }, []);
  const sortHotels = (order) => {
    const sortedHotels = [...hotel];
  
    if (order === "lowToHigh") {
      sortedHotels.sort((a, b) => a.price - b.price);
    } else if (order === "highToLow") {
      sortedHotels.sort((a, b) => b.price - a.price);
    }
  
    setHotel(sortedHotels);
  };
  
  return (
    <>
    <div className="bg-[url('/assets/home.jpg')]  bg-contain h-72  bg-no-repeat sm:bg-cover md:h-[40rem] ">
    <Navbar />
    </div>
    <Header />
    <div className="flex justify-center items-center   sm:my-8 px-4 sm:px-0">
    <div className="border-2 border-red-500 my-5 relative w-full max-w-md">
      <input
        type="text"
        placeholder="search hotels by cities or states "
        className="bg-neutral-200 p-3 w-full pr-12 placeholder:text-sm  placeholder:text-zinc-800 placeholder:font-semibold border-2 border-white rounded-3xl shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-center shadow-gray-400 "
      />
      <FaSearchLocation className="absolute top-1/2 transform -translate-y-1/2 right-8 h-6 w-6 text-gray-800 cursor-pointer hover:text-green-600 transition duration-200 ease-in-out" />
    </div>
  </div>
  
      <div className="flex flex-col sm:flex-row justify-between items-center mx-2 my-10 border-2 border-red-500  sm:mx-8">
       
        <SortHotels sortOrder={sortOrder} setSortOrder={setSortOrder} sortHotels={sortHotels} />
        <CurrencyExchange
          setCurrencyRates={setConversionRate}
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
        />
      </div>
      <h1 className="mt-20 -mb-5  border-2 border-red-500 text-center font-bold text-2xl sm:text-4xl text-gray-800 p-6 sm:p-8 uppercase rounded-lg " data-aos="fade-up">
  our Top choices
</h1>

      <div className="border-red-500 border-2 mt-20 mb-10  flex flex-wrap justify-evenly gap-8  px-4" data-aos="fade-up">
      

        {loading ? (
          <p className="text-lg text-gray-600">Hotels Loading...</p>
        ) : (
          currentHotels.map((hotelItem) => {
            const convertedPrice = ((hotelItem.price) * conversionRate).toFixed(2);
            const convertedTax = (0.18 * hotelItem.price * conversionRate).toFixed(2);

            const priceDisplay = `${currencySymbols[selectedCurrency]} ${(convertedPrice)}`;
            const taxDisplay = `${currencySymbols[selectedCurrency]} ${convertedTax}`;

            return (
              <div
              key={hotelItem._id}
              className="bg-white border border-gray-200 shadow-lg rounded-2xl w-full sm:w-96 md:w-80 hover:shadow-lg transition-transform transform hover:-translate-y-3 hover:scale-105 hover:shadow-gray-600"
            >
              <div className="relative">
                <div className="absolute top-3 left-3 z-20 hover:cursor-pointer">
                  <ShareBtn
                    hotelName={hotelItem.title}
                    hotelLink={`https://localhost:5173/hotel/${hotelItem.id}`}
                  />
                </div>
                <div className="absolute top-1 right-3 z-20 text-white hover:cursor-pointer">
                  <LikeBtn />
                </div>
                <img
                  src={hotelItem.image}
                  alt={hotelItem.title}
                  className="rounded-t-2xl h-56 w-full object-cover"
                />
              </div>
              <div className="p-5">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                  {hotelItem.title}
                </h2>
                <p className="flex text-gray-600 mt-2 text-sm sm:text-base">
                 <FaMapMarkerAlt className="-mx-1 mt-1 text-red-500 " /> <span className="px-2"> {hotelItem.city}, {hotelItem.state}, {hotelItem.country}</span>
                </p>
                <p className="text-lg font-semibold text-slate-700 mt-4">
                  {priceDisplay}
                  <span className="text-sm text-gray-400 font-normal">
                    /- per night <br />+ {taxDisplay} taxes
                  </span>
                </p>
                <div className="flex justify-between mt-5">
                  <Link to={`/hotel/${hotelItem._id}`}>
                    <button className="flex bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-transform transform hover:scale-105 shadow-md hover:shadow-md hover:shadow-slate-700">
                      View <TbListDetails className="ml-2 mt-1" />
                    </button>
                  </Link>
                  <Link to={`/hotel/${hotelItem._id}/booking`}>
                    <button className="bg-red-500 text-white flex  px-4 py-2 rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105 shadow-md hover:shadow-md hover:shadow-slate-700">
                      Book Now <FaHotel className="ml-2 mt-1" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            
            );
          })
        )}
      </div>

      {/* Pagination Buttons */}
      <div className="border-2 border-red-500  flex justify-center my-40 ">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-2 rounded-full ${
              index + 1 === currentPage
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            } hover:bg-gray-400 hover:text-white`}
          >
            {index + 1}
          </button>
        ))}
      </div>
<div className="border-2 border-red-500 my-80" data-aos="fade-down">
      <ScrollComponent/>
</div>

<div className="border-2 border-red-500 my-80" data-aos="fade-down">
      <FAQs/>
</div>
      <div className="border-2 border-red-500 my-80" data-aos="fade-right">
        <Blogs/>
        </div>
      <div className="border-red-500 border-2 my-20 bg-gray-50 flex flex-col justify-evenly items-center sm:flex-row gap-6 py-10" >
        <Counter start={0} end={1000} duration={2000} value="Hotels Listed" color="black" />
        <Counter start={0} end={6000} duration={2000} value="Users Registered" color="green" />
        <Counter start={0} end={500} duration={2000} value="Cities Available" color="sky" />
        <Counter start={0} end={2000} duration={2000} value="Customer Feedbacks" color="red" />
      </div>
      <div data-aos="fade-down">
      <Footer />
      </div>
    </>
  );
};

export default Home;
