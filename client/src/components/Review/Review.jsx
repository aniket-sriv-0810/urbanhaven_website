import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../userContext/userContext";
import axios from "axios";


const Review = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const [review, setReview] = useState({
    rating: "5",
    comment: "",
  });

  const handleInputChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const dataSent = {
      user: user._id,
      rating: review.rating,
      comment: review.comment,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/hotel/${id}/review`,
        dataSent,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setReview({
          rating: "",
          comment: "",
        });
        navigate(`/review/done`);
      }
    } catch (error) {
      console.error("Failed to create review", error);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-10 px-5 sm:px-20 min-h-screen flex justify-center items-center rounded-xl">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h1 className=" text-center xs:text-lg text-base font-bold text-gray-700 mb-6">
          Kindly Provide Your Feedback
        </h1>
        <form onSubmit={handleSubmitForm} className="space-y-6">
          {/* User Information */}
          <div className="flex items-center justify-center gap-4">
            <img
              src={user ? user.image : null}
              alt="User"
              className="w-10 h-10 xs:w-14 xs:h-14 rounded-full shadow-md"
            />
            <div>
              <h2 className="text-base font-semibold text-gray-700">
                {user ? user.name.toUpperCase() : ""}
              </h2>
              <p className="text-sm text-gray-500">
                {user ? `@${user.username.toLowerCase()}` : ""}
              </p>
            </div>
          </div>

          {/* Star Rating */}
          <fieldset className="starability-slot m-auto ">
         
         {[1, 2, 3, 4, 5].map((rate) => (
           <React.Fragment key={rate}>
             <input
               type="radio"
               id={`rate${rate}`}
               name="rating"
               value={rate}
               onChange={handleInputChange}
             />
             <label htmlFor={`rate${rate}`}>{rate} star{rate > 1 && "s"}</label>
           </React.Fragment>
         ))}
         </fieldset>

          {/* Comment Box */}
          <textarea
            name="comment"
            placeholder="Enter your comment..."
            required
            value={review.comment}
            onChange={handleInputChange}
            className="w-full p-4 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500 text-gray-800"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-lg font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg hover:from-green-600 hover:to-emerald-700 hover:scale-105 transition-all"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default Review;



