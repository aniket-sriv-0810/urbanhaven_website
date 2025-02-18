import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Banner from "../assets/banner.png";
import {  FaUsers, FaCity, FaComments } from "react-icons/fa";
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
import SearchBar from "../components/SearchBar/SearchBar";
import HotelCard from "../components/HotelCard/HotelCard";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { useUser } from "../components/userContext/userContext";
import TypingAnimation from "../components/TypingAnimation/TypingAnimation";



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
  const [hotels, setHotels] = useState([]);
  const {user} = useUser();


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
    {/* Navbar & bg wallpaper component */}
    <div className="bg-[url('/assets/home.jpg')] xs:bg-cover bg-contain h-72  bg-no-repeat sm:bg-cover md:h-[40rem] ">
    <Navbar />
    </div>

    <Header />
    <div className=" bg-gray-100 p-4">
      <SearchBar setHotels={setHotels} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {hotels.map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </div>
    <div data-aos="fade-up">
  <TypingAnimation/>
  </div>
      <div className="flex flex-col-reverse gap-y-5 sm:flex-row justify-between items-center mx-2 my-10 sm:mx-8">

        <SortHotels sortOrder={sortOrder} setSortOrder={setSortOrder} sortHotels={sortHotels} />
        <CurrencyExchange
          setCurrencyRates={setConversionRate}
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
        />
      </div>
     
      <h1
  className="mt-20 -mb-5 text-center font-extrabold text-2xl sm:text-5xl text-gray-900 capitalize 
            bg-gradient-to-r from-slate-900 to-slate-700 text-transparent bg-clip-text 
            drop-shadow-lg shadow-gray-600 p-8 rounded-xl animate-fadeIn"
  data-aos="fade-up"
>
   Discover Our Top Choices
</h1>

      <div className=" mt-20 mb-10  flex flex-wrap justify-evenly gap-8  px-4" data-aos="fade-up">
      

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
                  <LikeBtn id={user ? user._id : null} hotelId={hotelItem ? hotelItem._id : null} />
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
                <p className="text-lg font-semibold text-gray-700 mt-4">
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
      <div className="      flex justify-center my-40 ">
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
<div className="     my-80" data-aos="fade-down">
      <ScrollComponent/>
</div>

<div className="     my-80" data-aos="fade-down">
      <FAQs/>
</div>
{/*
      <div className="     my-80" data-aos="fade-right">
        <Blogs/>
        </div>
    */}
    <div className="my-20 bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col justify-evenly items-center sm:flex-row gap-6 py-10 px-5 sm:px-20">
      <Counter start={0} end={1000} duration={2000} value="Hotels Listed" color="blue" icon={<FaHotel className="text-blue-500 text-5xl" />} />
      <Counter start={0} end={6000} duration={2000} value="Users Registered" color="green" icon={<FaUsers className="text-green-500 text-5xl" />} />
      <Counter start={0} end={500} duration={2000} value="Cities Available" color="purple" icon={<FaCity className="text-purple-500 text-5xl" />} />
      <Counter start={0} end={2000} duration={2000} value="Customer Feedbacks" color="red" icon={<FaComments className="text-red-500 text-5xl" />} />
    </div>
      <div data-aos="fade-up">
      <Footer />
      </div>
    </>
  );
};

export default Home;
