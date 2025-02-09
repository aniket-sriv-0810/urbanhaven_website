import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserWishlists = () => {
    const [wishlists, setWishlists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        if (!id) {
            setError("User not logged in");
            setLoading(false);
            return;
        }

        const fetchWishlist = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8000/v1/user/${id}/account/wishlists`,
                    { withCredentials: true }
                );

                console.log("Fetched Wishlists:", res.data); // Debugging log
                
                if (res.data && res.data.data && Array.isArray(res.data.data.wishlists)) {
                    setWishlists(res.data.data.wishlists);
                } else {
                    setWishlists([]);
                    console.error("Unexpected data format:", res.data);
                }
            } catch (err) {
                setError("Failed to fetch wishlists");
                console.error("Error fetching wishlist:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [id]);

    if (loading) return <p>Loading wishlists...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
      <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">My Wishlists</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlists ? wishlists.length > 0 ? (
              wishlists.map((hotel) => (
                  <div key={hotel._id} className="bg-white p-4 shadow-lg rounded-xl">
                      <img src={hotel.image} alt="Hotel" className="w-full h-40 object-cover rounded-lg" />
                      <h3 className="text-lg font-semibold mt-3">{hotel.title}</h3>
                      <p className="text-gray-600">{hotel.description}</p>
                      <p className="mt-2 text-gray-900 font-bold">₹{hotel.price} per night</p>
                  </div>
              ))
          ) : (
              <p>No Wishlists found.</p>
          ) : null}
      </div>
  </div>
    );
};

export default UserWishlists;
