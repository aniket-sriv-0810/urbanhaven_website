import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import axios from "axios";
import { useUser } from "../userContext/userContext";

const LikeBtn = ({ hotelId, id }) => {
    const { user } = useUser();
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(true);

    // Fetch user's wishlist status on mount
    useEffect(() => {
        if (!id || !user) return;

        const checkIfLiked = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/v1/user/${id}/account`,
                    { withCredentials: true }
                );
                
                // Check if hotel is in user's wishlist
                setIsLiked(res.data.data.userInfo.wishlists.includes(hotelId));
            } catch (error) {
                console.error("Error fetching wishlist:", error);
            } finally {
                setLoading(false);
            }
        };

        checkIfLiked();
    }, [id, user, hotelId]);

    // Toggle wishlist
    const toggleWishlist = async () => {
        if (!id) {
            alert("Please login to add to wishlist!");
            return;
        }

        try {
            setIsLiked((prev) => !prev); // Optimistic UI update

            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/v1/user/${id}/account/wishlist`,
                { hotelId },
                { withCredentials: true }
            );

            console.log(res.data.message);
        } catch (error) {
            console.error("Error updating wishlist:", error);
            setIsLiked((prev) => !prev); // Revert UI state on error
        }
    };

    if (loading) return <FaRegHeart className="w-7 h-10" />

    return (
        <p
            onClick={toggleWishlist}
            className="cursor-pointer hover:scale-110 transition-all duration-150"
        >
            {isLiked ? (
                <FaHeart className="text-red-600 w-7 h-10" />
            ) : (
                <FaRegHeart className="w-7 h-10" />
            )}
        </p>
    );
};

export default LikeBtn;
