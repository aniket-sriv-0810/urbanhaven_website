import Booking from "../model/booking.model.js";
import { User } from "../model/user.model.js";
import Hotel from "../model/hotel.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";


// User Account Details
const userAccountDetails = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Id=", id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, null, "User ID is invalid!");
    }
    const userInfo = await User.findById(id);
    if (!userInfo) throw new ApiError(400, null, "user doesn't exist");
    console.log("User Info =>", userInfo);

    return res
      .status(200)
      .json(new ApiResponse(200, { userInfo }, "User detailed !"));
  } catch (error) {
    console.error("User data fetch error", error);
  }
});

// Show the particular booking booked by User
const userBookingDetails = asyncHandler ( async ( req , res) => {
  try {
    const {id} = req.params ;
        
         if(!id){
             throw new ApiError(400 ,"Hotel ID is required!");
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new ApiError(400, "Invalid ID", "Failed to Show the Hotel!");
        }
        const showBookings = await User.findById(id) .populate({
          path: "bookings", // Populate the bookings array
        });
        console.log("Booking data loaded...");
        return res.status(200).json (
          new ApiResponse(200 , {showBookings} , "Booking data loaded successfully !")
        )
  } catch (error) {
    throw new ApiError(400 , error , "Failed to Show the Booking data!");
  }
})

// CANCEL the particular booking  of the user
const cancelBooking = asyncHandler ( async ( req , res) => {
  try {
    const {id} = req.params ;
    if(!id){
      throw new ApiError(400 ,"Hotel ID is required!");
 }
 if (!mongoose.Types.ObjectId.isValid(id)) {
   throw new ApiError(400, "Invalid ID", "Failed to Show the Hotel!");
 }
 await Booking.findByIdAndDelete(id);
 console.log("Successfully cancelled !");
 return res.status(200).json(
  new ApiResponse(200 , "Booking cancelled !")
 )
  } catch (error) {
    throw new ApiError(400, error ,"Failed to CANCEL the Booking !")
  }
})

const toggleWishlist = async (req, res) => {
  const { userId } = req.params;
  const { hotelId } = req.body;

  try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      const hotelExists = await Hotel.findById(hotelId);
      if (!hotelExists) return res.status(404).json({ message: "Hotel not found" });

      const index = user.wishlists.indexOf(hotelId);
      if (index === -1) {
          user.wishlists.push(hotelId); // Add hotel to wishlist
      } else {
          user.wishlists.splice(index, 1); // Remove from wishlist
      }

      await user.save();
      return res.status(200).json({ wishlists: user.wishlists });
  } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
  }
};

 const getWishlist = async (req, res) => {
  const { userId } = req.params;

  try {
      const user = await User.findById(userId).populate('wishlists');
      if (!user) return res.status(404).json({ message: "User not found" });

      res.status(200).json({ wishlists: user.wishlists });
  } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
  }
};
// User Account Edit Details
const userAccountEditDetails = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Id=", id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, null, "User ID is invalid!");
    }
    const { name, username, email, phone } = req.body;
    console.log("------------USER EDIT-----------");
    console.log(name, username, email, phone);

    console.log("Req.file =>", req.file);
    let cloudinaryResult = null;

    if (req.file) {
      // Upload the file to Cloudinary
      cloudinaryResult = await uploadOnCloudinary(req.file.path);
    }

    const updatedUserData = {
      name,
      username,
      email,
      phone
    };

    if (cloudinaryResult && cloudinaryResult.url) {
      updatedUserData.image = cloudinaryResult.url;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, {
      new: true,
      runValidators: true
    });
    if (!updatedUserData) {
      throw new ApiError(
        400,
        "Couldn't find updated user !",
        "Something went wrong"
      );
    }
    console.log("user updated !", updatedUser);

    return res
      .status(200)
      .json(
        new ApiResponse(200, { updatedUser }, "user Updated Successfully !")
      );
  } catch (error) {
    console.error("Failed to update user !", error);
  }
});

// User Account Deletion
const userAccountDelete = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Id=", id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, null, "User ID is invalid!");
    }
    console.log("User Id Deleted", id);
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new ApiError(400, "Unable to delete the hotel !");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, " Deleted Successfully !"));
  } catch (error) {
    console.log("Failed to delete the user " + error);
  }
});

export {
  userAccountDetails,
  userBookingDetails,
  cancelBooking,
  userAccountEditDetails,
  userAccountDelete,
  toggleWishlist,
  getWishlist
};
