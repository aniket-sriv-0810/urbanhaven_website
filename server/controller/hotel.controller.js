import Hotel from '../model/hotel.model.js';
import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import mongoose from 'mongoose';


// Home Page Logic - Display all the hotels
const allHotel = async(req,res) =>{
   try {
     const allHotel = await Hotel.find({});
     return res.status(200).json(
       new ApiResponse(200 , {allHotel} , "List of all Hotels ! ")
     );
   } catch (error) {
    throw new ApiError(400 , error.message , "Unable to display all hotels");
   }
};
// Search hotel
const searchHotels = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    const regex = new RegExp(query, "i"); // Case-insensitive search

    const hotels = await Hotel.find({
      $or: [{ name: regex }, { city: regex }, { state: regex }, { country: regex }],
    });

    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Register a new Hotel Logic
const newHotelCreation = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      city,
      state,
      country,
    } = req.body;

    // Validate files existence
  if(!req.file){
    throw new ApiError(400 , "Image file not found !");
  }
  const imagePath = req.file.path ;
  const image = await uploadOnCloudinary(imagePath);


    // Create a new hotel
    const newHotel = new Hotel({
      title,
      description,
      price,
      city,
      state,
      country,
      image:image.url, // Save Cloudinary URL
    });
    await newHotel.save();

    console.log("New hotel saved!");
    return res.status(200).json(new ApiResponse(200, "Hotel Successfully Registered!"));
  } catch (error) {
    console.error("Error in newHotelCreation:", error);
    throw new ApiError(400, error.message, "Failed to Register a new Hotel!");
  }
});
// Show  a particular hotel
const showMyHotel = async(req , res ) => {
   try {
     let {id} = req.params;
    
     if(!id){
         throw new ApiError(400 ,"Hotel ID is required!");
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid ID", "Failed to Show the Hotel!");
    }
     const showHotel = await Hotel.findById(id) .populate({
      path: "review", // Populate the reviews array
      populate: {
        path: "userDetails", // Populate the userDetails inside each review
        select: "name username image", // Only include specific fields from User model
      },
    });

    const totalReviews = showHotel.review.length; // Count the reviews

     // Calculate the average rating
     const totalRatings = showHotel.review.reduce((acc, review) => acc + review.rating, 0);
     const avgRating = showHotel.review.length > 0 ? (totalRatings / showHotel.review.length).toFixed(2) : 0;
 
     if (!showHotel) {
      throw new ApiError(404, "Hotel not found", "Failed to Show the Hotel!");
    }
    
     console.log("My Hotel => " ,showHotel);
     console.log("Review Count => " ,totalReviews);
     return res.status(200).json(new ApiResponse(200 , {showHotel , allReviews : showHotel.review , totalReviews , avgRating} , "Here's my hotel !"));
   }
   catch (error) {
   throw new ApiError(400 , error , "Failed to Show the Hotel !"); 
   }
};

// Edit a particular hotel
const editMyHotel =  asyncHandler(async (req , res) => {
    try {
      let {id} = req.params;
      const {title , description , price , city , state , country} = req.body;
      if(!id){
        throw new ApiError(400 ,"Hotel ID is required!");
   }
   if (!mongoose.Types.ObjectId.isValid(id)) {
     throw new ApiError(400, "Invalid ID", "Failed to Show the Hotel!");
   }
  console.log("Req.file =>" , req.file);
  let cloudinaryResult = null;

  if (req.file) {
    // Upload the file to Cloudinary
    cloudinaryResult = await uploadOnCloudinary(req.file.path);
  }

  const updatedData = {
    title,
    description,
    price,
    city,
    state,
    country,
  };
  
  // Update image field if a new image is uploaded
  if (cloudinaryResult && cloudinaryResult.url) {
    updatedData.image = cloudinaryResult.url;
  }
  
  const updatedHotel = await Hotel.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
  if(!updatedData){
    throw new ApiError(400,"Couldn't find updated hotel !" , "Something went wrong")
  }
  res.status(200).json(new ApiResponse(200, {updatedHotel} , "Hotel Updated Successfully !"));
    } 
    catch (error) {
    throw new ApiError (400 , error ,  "Error in updating the hotel details !");  
    }
});

// Delete a Particular Hotel
const deleteMyHotel =  asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if(!id){
      throw new ApiError(400 ,"Hotel ID is required!");
 }
 if (!mongoose.Types.ObjectId.isValid(id)) {
   throw new ApiError(400, "Invalid ID", "Failed to Show the Hotel!");
 }
    console.log("Hotel ID to delete:", id); // Debugging
    const deletedHotel = await Hotel.findByIdAndDelete(id);
    if (!deletedHotel) {
      throw new ApiError(400,"Unable to delete the hotel !")
    }
    return res.status(200).json(
      new ApiResponse(200 , " Deleted Successfully !")
    );
  }
  catch (error) {
    throw new ApiError(400 , error , "Failed to delete the hotel !");
  }
});




export { allHotel , newHotelCreation , showMyHotel , editMyHotel , deleteMyHotel , searchHotels } ;