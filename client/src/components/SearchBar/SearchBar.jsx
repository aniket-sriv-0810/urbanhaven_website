import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const SearchBar = ({ setHotels }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (!query) return;

    try {
      const { data } = await axios.get(`http://localhost:8000/search?query=${query}`);
      setHotels(data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  return (
<div className="flex flex-wrap items-center justify-center gap-4 p-6 w-full max-w-2xl mx-auto bg-white/50 backdrop-blur-md shadow-2xl rounded-2xl border border-gray-300 transition-all duration-300 hover:shadow-md">
  {/* Input Box with Icon */}
  <div className="relative w-full sm:w-[80%] flex  items-center">
    <FaSearch className="absolute left-4 text-gray-500 text-xl" />
    <input
      type="text"
      placeholder="Search for hotels, destinations..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg bg-white placeholder-gray-400 hover:border-gray-400"
    />
  </div>

  {/* Search Button */}
  <button
    onClick={handleSearch}
    className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
  >
    <FaSearch className="mr-2 text-xl" />
    Search
  </button>
</div>

  );
};

export default SearchBar;
