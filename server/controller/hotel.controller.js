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

// Register a new Hotel Logic
const newHotelCreation = asyncHandler(async(req ,res) =>{
    try {
      const {title , description , price , city , state , country } = req.body;
      if (!req.file) {
        throw new ApiError(400, "Image file is required", "Failed to Register Hotel");
      }
      
      const imagePath = req.file.path ;
      const image = await uploadOnCloudinary(imagePath);
      const newHotel = new Hotel(
        {
          title ,
          description ,
          price ,
          city ,
          state ,
          country ,
          image:image.url ||  "https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI="
      }
    )
      await newHotel.save();
      console.log("new hotel saved !");
      return res.status(200).json(new ApiResponse ( 200 , "Hotel Successfully Registered !"));
    } 
    catch (error) {
      throw new ApiError(400 , error , " Failed to Register a new Hotel !");
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
     const showHotel = await Hotel.findById(id).populate("review");
     if (!showHotel) {
      throw new ApiError(404, "Hotel not found", "Failed to Show the Hotel!");
    }
    
     console.log("My Hotel => " ,showHotel);
     return res.status(200).json(new ApiResponse(200 , {showHotel , allReviews : showHotel.review} , "Here's my hotel !"));
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


// Contact Form logic
const contactLogic = (req,res) =>{
    return res.status(200).json(
      new ApiResponse(200 , "Hello From Backend !")
    );
}

export { allHotel , newHotelCreation , contactLogic , showMyHotel , editMyHotel , deleteMyHotel } ;