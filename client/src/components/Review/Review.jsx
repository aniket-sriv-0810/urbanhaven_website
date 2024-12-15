import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Review = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [review, setReview] = useState({
    name: "",
    rating: "",
    comment: "",
  });

  const handleInputChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    console.log(review);
    const dataSent = {
      name : review.name,
      rating : review.rating,
      comment : review.comment
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/hotel/${id}/review`,
        dataSent ,{
          withCredentials:true,
        }
      );
      console.log(response.data.message);
      
      if (response.status === 200) {
        setReview({
          name: "",
          rating: "",
          comment: "",
        });
      }
    navigate(`/hotel/${id}`)
     
    } catch (error) {
      console.error("Failed to create review", error);
    }
  };

  return (
    <div>
      <h1>Submit Your Review</h1>
      <form
        className="border-gray-500 border-2 w-max m-auto p-5 rounded-lg"
        onSubmit={handleSubmitForm}
      >
        <input
          type="text"
          placeholder="Enter Name"
          required
          name="name"
          className="border-gray-500 border-2"
          value={review.name}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <fieldset className="starability-slot">
          <legend>Rating:</legend>
          <input
            type="radio"
            id="rate0"
            name="rating"
            value="0"
            disabled={true}
            defaultChecked
            onChange={handleInputChange}
          />
          <input
            type="radio"
            id="rate1"
            name="rating"
            value="1"
            onChange={handleInputChange}
          />
          <label htmlFor="rate1">1 star</label>
          <input
            type="radio"
            id="rate2"
            name="rating"
            value="2"
            onChange={handleInputChange}
          />
          <label htmlFor="rate2">2 stars</label>
          <input
            type="radio"
            id="rate3"
            name="rating"
            value="3"
            onChange={handleInputChange}
          />
          <label htmlFor="rate3">3 stars</label>
          <input
            type="radio"
            id="rate4"
            name="rating"
            value="4"
            onChange={handleInputChange}
          />
          <label htmlFor="rate4">4 stars</label>
          <input
            type="radio"
            id="rate5"
            name="rating"
            value="5"
            onChange={handleInputChange}
          />
          <label htmlFor="rate5">5 stars</label>
        </fieldset>
        <br />
        <input
          type="text"
          placeholder="Enter Comment"
          required
          name="comment"
          className="border-gray-500 border-2"
          value={review.comment}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <button type="submit" className="border-gray-500 border-2">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default Review;
