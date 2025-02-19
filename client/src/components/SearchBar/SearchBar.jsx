import { useState ,useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
const SearchBar = ({ setHotels }) => {
  const [q, setQ] = useState("");

  const handleSearch = async () => {
    try {
      if (!q) {
        console.log("Hello World !");
        return;
      }
      const response = await axios.get(`http://localhost:8000/search?q=${q}`);
      console.log("API Response:", response.data.data.hotels);
      setHotels(response.data.data.hotels || []); // Make sure we extract the hotels array
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };
  
 useEffect(() => {
    AOS.init({
      duration: 1500, // Animation duration
      easing: "ease-in-out", // Smooth effect
      mirror:true,
      once: false, // Animation repeats on scroll
    });
  }, []);
  return (
<div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-3xl mx-auto p-6 rounded-2xl bg-white/20 backdrop-blur-xl shadow-xl border border-gray-200 transition-all duration-300 hover:shadow-2xl" data-aos="fade-down">
<h1 className="text-base sm:text-3xl font-extrabold text-center my-6 bg-gradient-to-r from-slate-600 to-cyan-800 text-transparent bg-clip-text drop-shadow-lg">
  Discover Your Dream Destination
</h1>

      {/* Input Box with Animated Icon */}
      <div className="relative w-full sm:w-[75%]">
        <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl transition-all duration-300 group-hover:scale-110" />
        <input
          type="text"
          placeholder="search your destination wherever you wanna stay..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full pl-14 pr-4 py-3 text-lg bg-white/70 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 placeholder-gray-500 hover:border-gray-400 outline-none placeholder:text-sm"
        />
      </div>

      {/* Search Button with 3D Effect */}
      <button
        onClick={() => handleSearch()}
        className="px-6 py-3 flex items-center justify-center text-lg font-semibold text-white bg-gradient-to-r from-emerald-500 to-emerald-900 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 focus:ring-4 focus:ring-yellow-300"
      >
        <FaSearch className="mr-2 text-xl" />
        Search
      </button>
    </div>
  );
};

export default SearchBar;
