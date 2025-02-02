import { useState } from "react";
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
    <div className="flex items-center justify-center space-x-2 p-4">
      <input
        type="text"
        placeholder="Search hotels..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-lg px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
      />
      <button onClick={handleSearch} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
