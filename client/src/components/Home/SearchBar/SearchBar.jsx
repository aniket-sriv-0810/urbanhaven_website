import { useState ,useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const SearchBar = ({ setHotels }) => {
  const [q, setQ] = useState("");
  const [status , setStatus] = useState("");

  const handleSearch = async () => {
    try {
      if (!q) {
        setStatus("Please enter a destination!");
        return;
      }
  
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/hotels/search?q=${q}`);
  
      if (!response.data.data.hotels || response.data.data.hotels.length === 0) {
        setStatus("No Hotel Found!");
        setHotels([]); // Clear the existing list if no results
        return;
      }
      setHotels(response.data.data.hotels);
      setStatus(""); // Clear status if search is successful
    } catch (error) {
      setStatus("No hotel found...");
    }
  };

  return (
<div className={`flex flex-wrap items-center justify-center gap-4 w-full max-w-3xl mx-auto p-6 rounded-2xl bg-white/20 backdrop-blur-xl shadow-xl border border-gray-200 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-600 ${status.length > 0 ? " border-red-500" : null}`} >
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
          onChange={(e) => setQ(e.target.value.trimStart())}

          className="w-full pl-14 pr-4 py-3 text-lg bg-white/70 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 placeholder-gray-500 hover:border-gray-400 outline-none placeholder:text-sm"
        />
      </div>

      {/* Search Button with 3D Effect */}
      <button
        onClick={() => handleSearch()}
        className="px-6 py-3 flex items-center justify-center text-lg font-semibold text-white bg-gradient-to-t from-green-500 to-emerald-900 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 "
      >
        <FaSearch className="mr-2 text-xl" />
        Search
      </button>
      <div className="text-red-500 text-xl font-semibold">
        {status.length > 0  ? status : null}
      </div>
    </div>
  );
};

export default SearchBar;
