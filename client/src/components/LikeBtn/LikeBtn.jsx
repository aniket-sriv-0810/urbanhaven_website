import React , {useState} from 'react';
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
const LikeBtn = () => {
    const [isLiked , setIsLiked] = useState(false);
    const checkLike = () => {
        setIsLiked(!isLiked);
    }

  return (
   <>
   <p onClick={checkLike}>
{ isLiked ? <FaHeart className='text-red-600 w-7 h-10 '/> :    <FaRegHeart  className="w-7 h-10"/>}
</p>
   </>
  )
}

export default LikeBtn
