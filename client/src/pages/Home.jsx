import React, { useEffect, useState , useRef } from "react";
import axios from "axios";
import { FaHotel , FaUsers , FaComments , FaMountainCity  } from "react-icons/fa6";
import { GiStarsStack } from "react-icons/gi";
import { GrArticle } from "react-icons/gr";
import { IoMdHelpCircle } from "react-icons/io";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import {Link } from "react-router-dom";
import CurrencyExchange from "../components/Home/CurrencyExchange/CurrencyExchange";
import Navbar from "../components/Navbars/Navbar/Navbar";
import Counter from "../components/Home/Counter/Counter";
import Footer from "../components/Footer/Footer";
import Header from "../components/Home/Header/Header";
import ScrollComponent from "../components/Home/ScollComponent/ScrollComponent";
import FAQs from "../components/FAQs/FAQs";
import SortHotels from "../components/Home/SortHotels/SortHotels";
import SearchBar from "../components/Home/SearchBar/SearchBar";
import TypingAnimation from "../components/Home/TypingAnimation/TypingAnimation";
import HotelHeading from "../components/Home/HotelHeading/HotelHeading";
import AOS from "aos";
import "aos/dist/aos.css";
import HotelDetails from "../components/HotelDetails/HotelDetails";
import Pagination from "../components/Pagination/Pagination";
import BlogList from "../components/Blogs/All-Blogs/BlogList";
import "./driver.css";
const Home = () => {
  const driverRef = useRef(null);
  const [conversionRate, setConversionRate] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [sortOrder, setSortOrder] = useState("default");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [allHotels, setAllHotels] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}`, { withCredentials: true });
        setAllHotels(response.data.data.allHotel);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();

  }, []);

  useEffect(() => {
    driverRef.current = new driver({
      showProgress: true,
      overlayColor: "rgba(0, 0, 0, 0.8)", // Darker overlay for a premium look
      popoverClass: "custom-driver-popover",
      allowClose: false, // Ensures users go through the tour
      animate: true,
      keyboardControl: true, // Enables keyboard navigation
      opacity: 0.85, // Slight transparency for a sleek effect
      steps: [
        {
          element: "#header",
          popover: {
            title: "🌟 Welcome to UrbanHaven Hotels!",
            description: "Your gateway to luxury and comfort. Explore top-rated hotels and book your dream stay effortlessly.",
            side: "bottom",
          },
        },
        {
          element: "#hotel-details",
          popover: {
            title: "🏨 Exclusive Hotel Listings",
            description: "Access and manage premium hotel details. Ensure every guest experiences the best hospitality.",
            side: "top",
          },
        },
        {
          element: "#search-btn",
          popover: {
            title: "🔍 Find Your Perfect Stay",
            description: "Use our advanced search to explore top-rated hotels in your dream destination with ease.",
            side: "top",
          },
        },
        {
          element: "#filter-btn",
          popover: {
            title: "🎯 Tailor Your Search",
            description: "Apply smart filters to sort hotels based on location, price, ratings, and amenities for a perfect match.",
            side: "top",
          },
        },
        {
          element: "#pagination-btn",
          popover: {
            title: "📜 Explore More Hotels",
            description: "Navigate through an extensive collection of premium hotels with seamless pagination.",
            side: "top",
          },
        },
        {
          element: "#navbar",
          popover: {
            title: "🧭 Effortless Navigation",
            description: "Quickly access key sections like bookings, user management, and hotel listings from one place.",
            side: "top",
          },
        },
        {
          element: "#faqs",
          popover: {
            title: "❓ Need Help? We've Got You!",
            description: "Browse our FAQs and support section for instant solutions to all your queries.",
            side: "top",
          },
        },
      ],
    });


    if (localStorage.getItem("startTour") === "true") {
      driverRef.current.drive();
      localStorage.removeItem("startTour");
    }

    return () => {
      driverRef.current = null;
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setItemsPerPage(width > 1024 ? 12 : width > 768 ? 10 : width > 480 ? 8 : 7);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHotels = Array.isArray(allHotels) ? allHotels.slice(indexOfFirstItem, indexOfLastItem) : [];

  const totalPages = Math.ceil(allHotels.length / itemsPerPage);

  useEffect(() => {
    AOS.init({
      offset: 60,
      duration: 1500,
      easing: "ease-in-out",
      mirror: true,
      once: false,
    });
  }, []);

  const sortHotels = (order) => {
    const sortedHotels = [...allHotels];

    if (order === "lowToHigh" || order === "default") {
      sortedHotels.sort((a, b) => a.price - b.price);
    } else if (order === "highToLow") {
      sortedHotels.sort((a, b) => b.price - a.price);
    }

    setAllHotels(sortedHotels);
  };

  return (
    <>
      <div className="bg-[url('/assets/home.jpg')] bg-cover h-72 bg-no-repeat sm:bg-cover md:h-[40rem] " id="navbar">
        <Navbar   />
      </div>

<div className="bg-gray-50">
      <Header />
       {/* Help / Tour Button */}
       <button
        onClick={() => driverRef.current?.drive()}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-5 bg-white p-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
      >
        <IoMdHelpCircle className="w-8 h-8 text-blue-500 md:w-10 md:h-10" />
      </button>

      <div className="flex flex-col-reverse gap-y-5 sm:flex-row justify-between items-center mx-2 my-20 sm:mx-8" data-aos="fade-up">
      <span id="filter-btn">
        <SortHotels sortOrder={sortOrder} setSortOrder={setSortOrder} sortHotels={sortHotels}  />
      </span>
        <CurrencyExchange setCurrencyRates={setConversionRate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency}  />
      </div>

      <div className="p-4 my-32" id="search-btn">
        <SearchBar className="search-bar" setHotels={setAllHotels}  />
      </div>

      <HotelHeading />

      <div className="hotel-cards mt-20 mb-40 flex justify-evenly flex-wrap gap-12 px-4" data-aos="fade-up" id="hotel-details">
        {loading ? <p className="text-lg text-gray-600">Hotels Loading...</p> : currentHotels.map((hotel) => <HotelDetails key={hotel._id} hotel={hotel} conversionRate={conversionRate} selectedCurrency={selectedCurrency} />)}
      </div>

      <div className="pagination" data-aos="fade-up" id="pagination-btn">
      <Pagination
  totalPages={totalPages}
  currentPage={currentPage}
  handlePageChange={setCurrentPage}
/>
      </div>

      <div className="my-80" data-aos="fade-down">
        <ScrollComponent />
      </div>

      <div className="my-80" data-aos="fade-down"  id="faqs">
        <FAQs />
      </div>

      <div className="my-60"  data-aos="fade-up">
        <TypingAnimation />
      </div>

      <div className="my-20  flex flex-col flex-wrap justify-evenly items-center xs:flex-row gap-6 xs:gap-3 py-10 px-5 sm:px-5" data-aos="fade-down">
        <Counter start={0} end={300} duration={2000} value="Hotels Listed" color="red" icon={<FaHotel className="text-red-500 text-2xl md:text-3xl lg:text-5xl" />} />
        <Counter start={0} end={5000} duration={2000} value="Users Registered" color="green" icon={<FaUsers className="text-green-500 text-2xl md:text-3xl lg:text-5xl" />} />
        <Counter start={0} end={4} duration={2000} value="Average Rating" color="yellow" icon={<GiStarsStack className="text-yellow-500 text-2xl md:text-3xl lg:text-5xl" />} />
        <Counter start={0} end={100} duration={2000} value="Cities Available" color="blue" icon={<FaMountainCity   className="text-blue-500 text-2xl md:text-3xl lg:text-5xl" />} />
      </div>
{/*Blogs*/}
<div>
  <BlogList/>
  <div className="flex justify-center items-center pb-20 bg-gray-100">
  <Link to="/all-blogs">
            <button className="flex items-center gap-3 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-t from-green-500 to-emerald-900 rounded-lg shadow-md transition-all duration-300 hover:scale-110 active:scale-95">
             <GrArticle/> All Blogs
            </button>
          </Link>
  </div>
</div>
</div>
      <div data-aos="fade-up">
        <Footer />
      </div>
    </>
  );
};

export default Home;
