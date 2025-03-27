import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import axios from "axios";
import { useUser } from "../userContext/userContext";
import { useNavigate } from "react-router-dom";

const LikeBtn = ({ hotelId, id }) => {
    const { user } = useUser();
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    

    // Fetch user's wishlist status on mount
    useEffect(() => {
        if (!id || !user) {
            setLoading(false);
            return;
        }

        const checkIfLiked = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/v1/user/${id}/account`,
                    { withCredentials: true }
                );
                // Check if hotel is in user's wishlist
                setIsLiked(res.data.data.userInfo.wishlists.includes(hotelId));
            } catch (error) {
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        checkIfLiked();
    }, [id, user, hotelId]);

    // Toggle wishlist
    const toggleWishlist = async () => {
        if (!id || !user) {
            navigate('/user/login'); 
            return; // Prevent further execution
        }

        try {
            setIsLiked((prev) => !prev); // Optimistic UI update

            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/v1/user/${id}/account/wishlist`,
                { hotelId },
                { withCredentials: true }
            );
        } catch (error) {
            setIsLiked((prev) => !prev); // Revert UI state on error
        }
    };

    if (loading) return <FaRegHeart className="w-7 h-10" />;

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
