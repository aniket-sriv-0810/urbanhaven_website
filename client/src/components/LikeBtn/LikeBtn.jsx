import React, { useState, useEffect } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const LikeBtn = ({ hotelId, userId }) => {
    const [isLiked, setIsLiked] = useState(false);
    
{/* 
    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/v1/user/${userId}/account/wishlist`,
                {withCredentials: true}
              );
                if (res.data.wishlists.includes(hotelId)) {
                    setIsLiked(true);
                }
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };
        if (userId) fetchWishlist();
    }, [userId, hotelId]);

    const toggleWishlist = async () => {
        if (!userId) {
            alert("Please login to add to wishlist!");
            return;
        }
        try {
            const res = await axios.post(`http://localhost:8000/v1/user/${userId}/account/wishlist`,
                {withCredentials: true}, 
                { hotelId });
            setIsLiked(res.data.wishlists.includes(hotelId));
        } catch (error) {
            console.error('Error updating wishlist:', error);
        }
    };
*/}
const toggleLike = () => {
  setIsLiked(!isLiked);
}
    return (
        <p onClick={toggleLike}  className="hover:scale-110 transition-none duration-150 ">
            {isLiked ? <FaHeart className="text-red-600 w-7 h-10" /> : <FaRegHeart className=" w-7 h-10" />}
        </p>
    );
};

export default LikeBtn;
