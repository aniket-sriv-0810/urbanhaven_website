import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import UserNavbar from "../../components/Navbars/UserNavbar/UserNavbar";
import NotAvailable from "../loaders/NotAvailable";
import SkeletonList from "../../components/LoadingSkeleton/SkeletonList";
import ErrorPopup from "../../components/PopUps/ErrorPopup/ErrorPopup";
import UserWishlist from "../../components/User/UserWishlist/UserWishlist";
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

        useEffect(() => {
          AOS.init({
            offset: 60, // Start animation after scrolling 100px
            duration: 1500, // Animation duration
            easing: "ease-in-out", // Smooth effect
            mirror:true,
            once: false, // Animation repeats on scroll
          });
        }, []);
    if (error) return <div className="text-center ">
    {error && <ErrorPopup message={error} onClose={() => setError("")} />} 
   </div>

    return (
        <div className=" bg-gray-100">
            <UserNavbar />
{
    loading ?
     <div className="text-center text-lg font-semibold text-gray-700"> <SkeletonList/> </div> 
     :
            <div className=" overflow-x-hidden">
                <h2 className="w-max text-3xl font-bold text-gray-900 m-auto mt-10 mb-6">My Wishlists</h2>
                <div className="grid grid-cols-1 sm:justify-evenly w-max m-auto items-center md:grid-cols-2  lg:grid-cols-3  gap-16 mt-10 py-10 mb-10">
                    {wishlists.length > 0 ? (
                        wishlists.map((hotel) => (
                            <div key={hotel._id} className="m-auto w-[90%]  xs:w-full " >
                                <UserWishlist hotel={hotel} />
                            </div>
                        ))
                    ) : (
                        <div className=" col-span-full text-center text-lg font-semibold text-gray-700">
                            <NotAvailable content={"No Hotel Found"} tagline={" Oops! It looks like your wishlist is empty . Why not explore our amazing collection and add something special to your list?"} />
                        </div>
                    )}
                </div>
            </div>
}
        </div>
    );
};

export default UserWishlists;
