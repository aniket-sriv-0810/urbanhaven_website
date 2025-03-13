import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHotel } from "react-icons/fa6";
import Shepherd from "shepherd.js"; // Import Shepherd.js
import "shepherd.js/dist/css/shepherd.css"; // Import Shepherd.js styles
import CurrencyExchange from "../components/CurrencyExchange/CurrencyExchange";
import Navbar from "../components/Navbars/Navbar/Navbar";
import Counter from "../components/Counter/Counter";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import ScrollComponent from "../components/ScollComponent/ScrollComponent";
import FAQs from "../components/FAQs/FAQs";
import SortHotels from "../components/SortHotels/SortHotels";
import SearchBar from "../components/SearchBar/SearchBar";
import TypingAnimation from "../components/TypingAnimation/TypingAnimation";
import HotelHeading from "../components/HotelHeading/HotelHeading";
import AOS from "aos";
import "aos/dist/aos.css";
import HotelDetails from "../components/HotelDetails/HotelDetails";
import Pagination from "../components/Pagination/Pagination";
import BlogList from "../components/Blogs/All-Blogs/BlogList";
const Home = () => {
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

    // Start tour if needed
    if (localStorage.getItem("startTour") === "true") {
      startTour();
      localStorage.removeItem("startTour");
    }
  }, []);

  const startTour = () => {
    const tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        classes: "shadow-md bg-purple-100 text-gray-900",
        scrollTo: { behavior: "smooth", block: "center" },
        cancelIcon: { enabled: true },
      },
    });

    tour.addStep({
      id: "navbar",
      title: "Welcome!",
      text: "This is the navigation bar where you can explore the website.",
      attachTo: { element: ".navbar", on: "bottom" },
      buttons: [{ text: "Next", action: tour.next }],
    });

    tour.addStep({
      id: "search-bar",
      title: "Search Hotels",
      text: "Use this bar to search for hotels based on location, price, and other filters.",
      attachTo: { element: ".search-bar", on: "bottom" },
      buttons: [
        { text: "Back", action: tour.back },
        { text: "Next", action: tour.next },
      ],
    });

    tour.addStep({
      id: "hotel-cards",
      title: "Hotel Listings",
      text: "These are the available hotels. Click on a card to view details.",
      attachTo: { element: ".hotel-cards", on: "top" },
      buttons: [
        { text: "Back", action: tour.back },
        { text: "Next", action: tour.next },
      ],
    });

    tour.addStep({
      id: "pagination",
      title: "Pagination",
      text: "Use these buttons to navigate through different hotel listings.",
      attachTo: { element: ".pagination", on: "top" },
      buttons: [
        { text: "Back", action: tour.back },
        { text: "Finish", action: tour.complete },
      ],
    });

    tour.start();
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
      offset: 60,
      duration: 1500,
      easing: "ease-in-out",
      mirror: true,
      once: false,
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
      <div className="bg-[url('/assets/home.jpg')] bg-cover h-72 bg-no-repeat sm:bg-cover md:h-[40rem] ">
        <Navbar className="navbar" />
      </div>

      <Header />

      <div className="flex flex-col-reverse gap-y-5 sm:flex-row justify-between items-center mx-2 my-16 sm:mx-8" data-aos="fade-up">
        <SortHotels sortOrder={sortOrder} setSortOrder={setSortOrder} sortHotels={sortHotels} />
        <CurrencyExchange setCurrencyRates={setConversionRate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />
      </div>

      <div className="p-4">
        <SearchBar className="search-bar" setHotels={setAllHotels} />
      </div>

      <HotelHeading />

      <div className="hotel-cards mt-20 mb-10 flex justify-evenly flex-wrap gap-8 px-4" data-aos="fade-up">
        {loading ? <p className="text-lg text-gray-600">Hotels Loading...</p> : currentHotels.map((hotel) => <HotelDetails key={hotel._id} hotel={hotel} conversionRate={conversionRate} selectedCurrency={selectedCurrency} />)}
      </div>

      <div className="pagination" data-aos="fade-up">
      <Pagination
  totalPages={totalPages}
  currentPage={currentPage}
  handlePageChange={setCurrentPage}
/>
      </div>

      <div className="my-80" data-aos="fade-down">
        <ScrollComponent />
      </div>

      <div className="my-80" data-aos="fade-down">
        <FAQs />
      </div>

      <div className="my-60"  data-aos="fade-up">
        <TypingAnimation />
      </div>

      <div className="my-20 bg-gray-100 flex flex-col flex-wrap justify-evenly items-center sm:flex-row gap-6 xs:gap-3 py-10 px-5 sm:px-5" data-aos="fade-down">
        <Counter start={0} end={1000} duration={2000} value="Hotels Listed" color="blue" icon={<FaHotel className="text-blue-500 text-2xl md:text-3xl lg:text-5xl" />} />
        <Counter start={0} end={1000} duration={2000} value="Hotels Listed" color="blue" icon={<FaHotel className="text-blue-500 text-2xl md:text-3xl lg:text-5xl" />} />
        <Counter start={0} end={1000} duration={2000} value="Hotels Listed" color="blue" icon={<FaHotel className="text-blue-500 text-2xl md:text-3xl lg:text-5xl" />} />
        <Counter start={0} end={1000} duration={2000} value="Hotels Listed" color="blue" icon={<FaHotel className="text-blue-500 text-2xl md:text-3xl lg:text-5xl" />} />
      </div>
{/*Blogs*/}
<div>
  <BlogList/>
</div>
      <div data-aos="fade-up">
        <Footer />
      </div>
    </>
  );
};

export default Home;
