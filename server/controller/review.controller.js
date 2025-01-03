import Review from "../model/review.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Hotel from "../model/hotel.model.js";
import {User} from '../model/user.model.js';



// Create a new Review
const createReview = asyncHandler(async (req, res) => {
  try {
    let { id } = req.params;
    let { user , rating, comment } = req.body;
     
    console.log("Params:", req.params);
    console.log("Body:", req.body);

    const hotel = await Hotel.findById(id);
    if (!hotel) {
      throw new ApiError(404, "Hotel not found");
    }
    const newReview = new Review({
      userDetails: user,
      rating,
       comment 
      });

    hotel.review.push(newReview);

    await hotel.save();
    await newReview.save();

    console.log("Review saved successfully !");

    return res
      .status(200)
      .json(new ApiResponse(200, { newReview }, "Review saved successfully !"));
  } catch (error) {
    throw new ApiError(400, error, "Failed to save review !");
  }
});

export { createReview };
