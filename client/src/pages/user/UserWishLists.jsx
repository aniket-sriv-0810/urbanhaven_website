import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserNavbar from "../../components/Navbars/UserNavbar/UserNavbar";
import HotelDetails from "../../components/HotelDetails/HotelDetails";

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
                    `${import.meta.env.VITE_API_URL}/v1/user/${id}/account/wishlists`,
                    { withCredentials: true }
                );

                if (res.data && res.data.data && Array.isArray(res.data.data.wishlists)) {
                    setWishlists(res.data.data.wishlists);
                } else {
                    setWishlists([]);
                }
            } catch (err) {
                setError("Failed to fetch wishlists");
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [id]);

    if (loading) return <p className="text-center text-lg font-semibold text-gray-700">Loading wishlists...</p>;
    if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

    return (
        <div className=" bg-gray-100">
            <UserNavbar />
            <div className=" overflow-x-hidden">
                <h2 className="w-max text-3xl font-bold text-gray-900 m-auto mt-5 mb-6">My Wishlists</h2>
                <div className="grid grid-cols-1 sm:justify-center w-max m-auto items-center md:grid-cols-2  lg:grid-cols-3 2xl:grid-cols-4 gap-10">
                    {wishlists.length > 0 ? (
                        wishlists.map((hotel) => (
                            <div key={hotel._id} className="m-auto w-[90%]  xs:w-full " >
                                <HotelDetails hotel={hotel} />
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-lg font-semibold text-gray-700">No wishlists found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserWishlists;
