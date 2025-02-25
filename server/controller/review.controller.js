import Review from "../model/review.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Hotel from "../model/hotel.model.js";
import {User} from '../model/user.model.js';
import mongoose from "mongoose";


// Create a new Review
const createReview = asyncHandler(async (req, res) => {
  try {
    let { id } = req.params;
    let { userDetails , rating, comment } = req.body;

    console.log("Params:", req.params);
    console.log("Body:", req.body);
// Check if Hotel ID is not found or if it is Valid
          if(!id){
            return res.status(404).json(
               new ApiError(404 ,"Hotel ID is required!")
            )
         }
         if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json(
             new ApiError(400, "Invalid ID", "Invalid ID ! Failed to Show the Review!")
          )
         }
          if (!req.user) {
                     return res.status(401).json(new ApiError(401, "Unauthorized", "User must be logged in to book!"));
                 }
                 if (!mongoose.Types.ObjectId.isValid(userDetails)) {
                     return res.status(400).json(new ApiError(400, "Invalid User ID", "Invalid user ID provided!"));
                 }
    const hotel = await Hotel.findById(id);
    if (!hotel) {
     return res.status(404).json(
      new ApiError(404 , "Invalid Details" , "No Hotel Details Found !")
     )
    }
    const newReview = new Review({
      userDetails: new mongoose.Types.ObjectId(userDetails),
      rating,
       comment
      });

      if (!newReview) {
        return res.status(404).json(
         new ApiError(404 , "Invalid Details" , "No Review Details Found !")
        )
       }
       if (!hotel.reviews) {
        hotel.reviews = [];
    }
    hotel.reviews.push(newReview);
    
    hotel.review.push(newReview);

    await hotel.save();
    await newReview.save();

    console.log("Review saved successfully !");

    return res
      .status(200)
      .json(new ApiResponse(200, { newReview }, "Review saved successfully !"));
  }
  catch (error) {
    return res.status(400).json({
      status:400,
      message:"Failure Occurred !",
      details:["Unable to Save Review !"],
      error:error.message || error
    }
     
    )
  }
});



export { createReview };
