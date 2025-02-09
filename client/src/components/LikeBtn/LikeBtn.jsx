import React, { useState, useEffect } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import axios from 'axios';

const LikeBtn = ({ hotelId, id }) => {
    const [isLiked, setIsLiked] = useState(false);
    // Toggle wishlist
    const toggleWishlist = async () => {
        if (!id) {
            alert("Please login to add to wishlist!");
            return;
        }
        try {
            setIsLiked(!isLiked);
            const res = await axios.post(
                `http://localhost:8000/v1/user/${id}/account/wishlist`,
                 {hotelId} ,
                { withCredentials: true }
            );
            console.log(res.data.data.wishlists);
            console.log(res.data.message);

        } catch (error) {
            console.error('Error updating wishlist:', error);
        }
    };

    return (
        <p onClick={toggleWishlist} className="cursor-pointer hover:scale-110 transition-all duration-150">
            {isLiked ? <FaHeart className="text-red-600 w-7 h-10" /> : <FaRegHeart className="w-7 h-10" />}
        </p>
    );
};

export default LikeBtn;
