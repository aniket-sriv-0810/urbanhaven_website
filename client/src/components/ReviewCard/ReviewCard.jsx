import React from 'react';
import Logo from '../../assets/webiste_full_logo.png';

const ReviewCard = ({ review }) => {
  return (
    <div className="w-full sm:w-80 max-w-full bg-white shadow-lg rounded-2xl border border-gray-200 p-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
      <div className="flex items-center gap-4">
        <img src={review.userDetails?.image || "https://media-hosting.imagekit.io//4bc72ff0889f4681/demo.png?Expires=1837020820&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=c3Nq6Mu7wtR7-l57wCuFJDWqnmAYe1mnhTV60rRh~Jbr8iEoriWR0qAXj7ZZTfT4XwDeVixlpLg0spaVCXXnT0PkgZgvPx8uAqEOl2brHCHXKkKbKmE3Szgkh6l~dfwmJhUcL1pLE0v23fLt6xcVnwglPQ~tZ1fmD02KYcjDD1cX8lTGmF2wSHJv0OVScK2Aw4mHuUSvWbBrDsRt7PpFfWskmXiWUG~QuWDgbcHuSrS2r2ffQ98PdMT96uhXeNRwZsmFs8BSzj15gVYC05hBdkk~7uKhWuA6rl5eSh61hqCLvkjElDrHe7wLa7tfJwUVYRcYicu6LTU0UIeNckAViw__"} alt="User profile" className="w-10 h-10 rounded-full shadow-md" />
        <div>
          <h2 className="text-base font-semibold text-gray-700">{review.userDetails?.name || "Anonymous"}</h2>
          <p className="text-sm text-gray-500">@{review.userDetails?.username || "unknown"}</p>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        {[1, 2, 3, 4, 5].map(rate => (
          <span key={rate} className={`text-3xl ${review.rating >= rate ? "text-yellow-400" : "text-gray-300"}`}>★</span>
        ))}
      </div>
      <p className="mt-4 text-gray-600 whitespace-pre-wrap break-words">{review.comment}</p>
      <div className="flex justify-end items-center mt-6">
        <p className="text-sm text-gray-500 font-semibold">Verified by</p>
        <img src={Logo} alt="Brand logo" className="w-16 ml-2" />
      </div>
    </div>
  );
};

export default ReviewCard;
