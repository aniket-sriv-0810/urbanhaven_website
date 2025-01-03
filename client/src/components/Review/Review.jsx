import React, {  useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {useUser} from '../userContext/userContext';
import axios from "axios";

const Review = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {user} = useUser();
  const [review, setReview] = useState({
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
      user : user._id,
      rating : review.rating,
      comment : review.comment
    }
    console.log("Data sent: " + JSON.stringify(dataSent));


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
      <img src={user? user.image : null} alt="User image" className="w-10 h-10 m-auto rounded-full my-3"/>

        <input
          type="text"
          required
          name="name"
          className="border-gray-500  text-center  border-0"
          value={user ? user.name.toUpperCase() : ""}
          onChange={handleInputChange}
          disabled
        />
        <br/>
        <input
          type="text"
          required
          name="username"
          className="border-gray-500  text-center  border-0  text-gray-600"
          value={user ? '@' + user.username.toLowerCase() :""}
          onChange={handleInputChange}
          disabled
        />
        
        <br />
        <br />
        <fieldset className="starability-slot">
          <legend>Rating:</legend>
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
        <button type="submit" className="border-gray-500 border-2 px-3 py-2 bg-green-500 text-white rounded-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Review;
