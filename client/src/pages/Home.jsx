import React, { useEffect, useState } from "react";;
import {  FaUsers, FaCity, FaComments } from "react-icons/fa";
import axios, { all } from "axios";
import { FaHotel } from "react-icons/fa6";
import {driver} from "driver.js"; // Import driver.js
import "driver.js/dist/driver.css"; // Import driver.js styles
import CurrencyExchange from "../components/CurrencyExchange/CurrencyExchange";
import Navbar from "../components/Navbars/Navbar/Navbar";
import Counter from "../components/Counter/Counter";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import ScrollComponent from "../components/ScollComponent/ScrollComponent";
import FAQs from "../components/FAQs/FAQs";
import SortHotels from "../components/SortHotels/SortHotels";
import SearchBar from "../components/SearchBar/SearchBar";
import HotelCard from "../components/HotelDetails/HotelDetails";
import TypingAnimation from "../components/TypingAnimation/TypingAnimation";
import HotelHeading from "../components/HotelHeading/HotelHeading";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import HotelDetails from "../components/HotelDetails/HotelDetails";
import Pagination from "../components/Pagination/Pagination";






const Home = () => {

  const [conversionRate, setConversionRate] = useState(1); // Default conversion rate for INR
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [sortOrder, setSortOrder] = useState("default");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [allHotels, setAllHotels] = useState([]);  // Store all hotels fetched from API
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
      // Check if the guided tour should start
      if (localStorage.getItem("startTour") === "true") {
        startTour();
        localStorage.removeItem("startTour"); // Remove flag after tour starts
      }
  }, []);


  const startTour = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: ".navbar", // Navbar highlight
          popover: {
            title: "Welcome!",
            description: "This is the navigation bar where you can explore the website.",
            position: "bottom",
          },
        },
        {
          element: ".search-bar", // Search box
          popover: {
            title: "Search Hotels",
            description: "Use this bar to search for hotels based on location, price, and other filters.",
            position: "bottom",
          },
        },
        {
          element: ".hotel-cards", // Hotel listings
          popover: {
            title: "Hotel Listings",
            description: "These are the available hotels. Click on a card to view details.",
            position: "top",
          },
        },
        {
          element: ".pagination", // Pagination
          popover: {
            title: "Pagination",
            description: "Use these buttons to navigate through different hotel listings.",
            position: "top",
          },
        },
      ],
    });

    driverObj.drive(); // Start the guided tour
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setItemsPerPage(width > 1024 ? 4 : width > 768 ? 3 : width > 480 ? 2 : 2);
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
      offset: 60, // Start animation after scrolling 100px
      duration: 1500, // Animation duration
      easing: "ease-in-out", // Smooth effect
      mirror:true,
      once: false, // Animation repeats on scroll
    });
  }, []);
 
  const sortHotels = (order) => {
    const sortedHotels = [...allHotels];
  
    if (order === "lowToHigh") {
      sortedHotels.sort((a, b) => a.price - b.price);
    } else if (order === "highToLow") {
      sortedHotels.sort((a, b) => b.price - a.price);
    }
  
    setAllHotels(sortedHotels);
  };
  
  return (
    <>
    {/* Navbar & bg wallpaper component */}
    <div className="bg-[url('/assets/home.jpg')]  bg-cover h-72  bg-no-repeat sm:bg-cover md:h-[40rem] ">
    <Navbar className="navbar" />
    </div>

    <Header />
    <div className="bg-gray-100 p-4">
    {/* Pass both allHotels & setFilteredHotels */}
    <SearchBar className="search-bar" setHotels={setAllHotels}  />

  </div>
      <div className="flex flex-col-reverse gap-y-5 sm:flex-row justify-between items-center mx-2 my-10 sm:mx-8" data-aos="fade-up">

        <SortHotels sortOrder={sortOrder} setSortOrder={setSortOrder} sortHotels={sortHotels} />
        <CurrencyExchange
          setCurrencyRates={setConversionRate}
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
        />
      </div>

<HotelHeading/>


      <div className="hotel-cards mt-20 mb-10 flex justify-evenly flex-wrap gap-8  px-4" data-aos="fade-up">

        {loading ? (
          <p className="text-lg text-gray-600">Hotels Loading...</p>
        ) : (
          currentHotels.map((hotel) => (
            <HotelDetails key={hotel._id} hotel={hotel} conversionRate={conversionRate} selectedCurrency={selectedCurrency} />
          ))
        )}

</div>
<div className="pagination" data-aos="fade-up">
      <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={setCurrentPage} />
      </div>

<div className="     my-80" data-aos="fade-down">
      <ScrollComponent/>
</div>

<div className="     my-80" data-aos="fade-down">
      <FAQs/>
</div>

  
<div data-aos="fade-up">
  <TypingAnimation/>
  </div>

    
    <div className="my-20 bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col flex-wrap justify-evenly items-center sm:flex-row gap-6 xs:gap-3 py-10 px-5 sm:px-5">
      <Counter start={0} end={1000} duration={2000} value="Hotels Listed" color="blue" icon={<FaHotel className="text-blue-500 text-2xl md:text-3xl lg:text-5xl" />} />
      <Counter start={0} end={6000} duration={2000} value="Users Registered" color="green" icon={<FaUsers className="text-green-500 text-2xl md:text-3xl lg:text-5xl" />} />
      <Counter start={0} end={500} duration={2000} value="Cities Available" color="purple" icon={<FaCity className="text-purple-500 text-2xl md:text-3xl lg:text-5xl" />} />
      <Counter start={0} end={2000} duration={2000} value="Customer Feedbacks" color="red" icon={<FaComments className="text-red-500 text-2xl md:text-3xl lg:text-5xl" />} />
    </div>
      <div data-aos="fade-up">
      <Footer />
      </div>
    </>
  );
};

export default Home;
