import Hotel from '../model/hotel.model.js';
import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import mongoose from 'mongoose';


// Home Page Logic - Display all the hotels Controller Code
const allHotel = async(req,res) =>{
   try {
     const allHotel = await Hotel.find({});

     if(!allHotel) {
      return res.status(404).json(
        new ApiError(404 , "No Hotels Found " , "Hotels unavailable !")
      )
     }
     return res.status(200).json(
       new ApiResponse(200 , {allHotel} , "List of all Hotels ! ")
     );
   }
   catch (error) {
    return res.status(400).json(
      new ApiError(400 , error.message , "Unable to display all hotels")
    )
   }
};


// Search hotel as per search and query Controller Code
const searchHotels = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    const regex = new RegExp(q, "i"); // Case-insensitive search

    const hotels = await Hotel.find({
      $or: [{ name: regex }, { city: regex }, { state: regex }, { country: regex }],
    });

    if(hotels.length <= 0){
      return res.status(404).json(
        new ApiError (404 , ["Not Found"] , "No Hotel Found !")
      )
    }

    return res.status(200).json(
      new ApiResponse(200 , {hotels} , "Here's your required hotels !")
    );

  } 
  catch (error) {
    return res.status(400).json({ message: "Server Error", error: error.message });
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


// Show  a particular hotel Controller Code
const showMyHotel = async(req , res ) => {
   try {
     let {id} = req.params;
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
        
     const showHotel = await Hotel.findById(id) .populate({
      path: "review", // Populate the reviews array
      populate: {
        path: "userDetails", // Populate the userDetails inside each review
        select: "name username image", // Only include specific fields from User model
      },
    });
    
    if(!showHotel){
      return res.status(404).json(
        new ApiError(404, "Unable to Find ", "Hotel Details Unavailable !")
     )
    }

    const totalReviews = showHotel.review.length; // Count the reviews

     // Calculate the average rating
     const totalRatings = showHotel.review.reduce((acc, review) => acc + review.rating, 0);
     const avgRating = showHotel.review.length > 0 ? (totalRatings / showHotel.review.length).toFixed(2) : 0;

     if(!totalReviews || !totalRatings || !avgRating){
      return res.status(404).json(
        new ApiError(404, "Unable to Find ", "Reviews Details Unavailable !")
     )
    }

     console.log("My Hotel => " ,showHotel);
     console.log("Review Count => " ,totalReviews);
     return res.status(200).json(new ApiResponse(200 , {showHotel , allReviews : showHotel.review , totalReviews , avgRating} , "Here's my hotel !"));
   }
   catch (error) {
      return res.status(400).json(
        new ApiError(400, "Unable to Find ", "FAILED to show Hotel Details !")
     )
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