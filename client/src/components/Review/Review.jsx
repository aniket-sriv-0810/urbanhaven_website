import React, {  useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {useUser} from '../userContext/userContext';
import axios from "axios";

const Review = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {user} = useUser();
  const [review, setReview] = useState({
    rating: "5",
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
    <>

      <h1 className="text-center font-semibold text-xl m-6">Kindly provide your Feedback</h1>
      <div className="">
      <form
        className="border-black border-2 rounded-xl w-80 py-4 m-auto flex flex-col gap-3 justify-center items-center bg-gray-100 shadow-lg shadow-slate-600"
        onSubmit={handleSubmitForm}
      >
      <div className="flex flex-col justify-center items-center">
      <img src={user? user.image : null} alt="User image" className="m-auto  my-3 w-12 h-12 rounded-full shadow-md shadow-black"/>

        <input
          type="text"
          required
          name="name"
          className="border-gray-500  text-center  border-0"
          value={user ? user.name.toUpperCase() : ""}
          onChange={handleInputChange}
          disabled
        />

        <input
          type="text"
          required
          name="username"
          className="border-gray-500  text-center  border-0  text-gray-600"
          value={user ? '@' + user.username.toLowerCase() :""}
          onChange={handleInputChange}
          disabled
        />
        </div>
       
        <fieldset className="starability-slot ">
         
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
          className="border-2 border-black -mt-12 p-2 rounded-xl bg-slate-300 placeholder:text-black text-center"
          value={review.comment}
          onChange={handleInputChange}
        />
        <button type="submit" className=" px-3 py-2 w-[70%] my-3 bg-green-600 text-white rounded-full">
          Submit
        </button>
      </form>
      </div>
    
    <br/>
   </>
    
  );
};

export default Review;
