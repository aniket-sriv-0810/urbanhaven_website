import Booking from "../model/booking.model.js";
import { User } from "../model/user.model.js";
import Hotel from "../model/hotel.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";



// User Account Details Controller Code
const userAccountDetails = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if(!id){
      return res.status(400).json(
         new ApiError(400 ,"User ID is required!")
      )
   }
   if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json(
       new ApiError(400, "Invalid ID", "Invalid ID ! Failed to Show the User details !")
    )
   }
    const userInfo = await User.findById(id);
    if (!userInfo){
      return res.status(400).json(
        new ApiError(400, null, "user doesn't exist")
      )
    }
    console.log("User Info =>", userInfo);

    return res
      .status(200)
      .json(new ApiResponse(200, { userInfo }, "User details !"));
  }
  catch (error) {
    console.error("User data fetch error", error);
    return res.status(400).json(
      new ApiError(400, null, "Failed to Show the User details !")
    )
  }
});

// Show the particular booking booked by User Controller Code
const userBookingDetails = asyncHandler ( async ( req , res) => {
  try {
    const {id} = req.params ;

    if(!id){
      return res.status(400).json(
         new ApiError(400 ,"User ID is required!")
      )
   }
   if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json(
       new ApiError(400, "Invalid ID", "Invalid ID ! Failed to Show the User details !")
    )
   }
        const showBookings = await User.findById(id)  .populate({
          path: "bookings",
          populate: {
            path: "hotelDetails", // Populate hotel details inside each booking
            model: "Hotel",
          },
        });

        if(!showBookings){
          return res.status(200).json(
            new ApiResponse(200, " No Booking details are available !")
         )
        }

        console.log("Booking data loaded...");

        return res.status(200).json (
          new ApiResponse(200 , {showBookings : showBookings.bookings} , "Booking data loaded successfully !")
        )
  }
  catch (error) {
    return res.status(400).json (
      new ApiError(400 ,  "Failed to Show the Booking data ! " , error = error)
    )
  }
})

const cancelBooking = asyncHandler(async (req, res) => {
  try {
    const { userId, bookingId } = req.params;

    // Validate IDs
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json(new ApiError(400, "Invalid User ID", "Invalid User ID!"));
    }
    if (!bookingId || !mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json(new ApiError(400, "Invalid Booking ID", "Invalid Booking ID!"));
    }

    // Find the booking
    const booking = await Booking.findOne({ _id: bookingId, userDetails: userId });
    if (!booking) {
      return res.status(404).json(new ApiError(404, "Booking not found", "No booking found for this user!"));
    }

    // Remove booking from User's `bookings` array
    await User.findByIdAndUpdate(userId, { $pull: { bookings: bookingId } });

    // Delete the booking from the `Booking` model
    await Booking.findByIdAndDelete(bookingId);

    console.log("Booking successfully cancelled and removed!");

    return res.status(200).json(new ApiResponse(200, "Booking cancelled successfully and removed!", {}));
  } catch (error) {
    console.error("Failed to cancel booking!", error);
    return res.status(500).json(new ApiError(500, "Server Error", "Failed to cancel the booking", error));
  }
});

// ADD & REMOVE Hotel Wishlists Controller Code
const toggleWishlist = async (req, res) => {
  const { id } = req.params;
  const { hotelId } = req.body;

  try {

  if(!id || !hotelId){
    return res.status(400).json(
       new ApiError(400 ,"Hotel or User ID is required!")
    )
 }
 if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(hotelId) ) {
  return res.status(400).json(
     new ApiError(400, "Invalid ID", "Invalid ID ! Failed to Show the WishLists details !")
  )
 }

      const user = await User.findById(id);
      if (!user){
        return res.status(404).json({ message: "User not found" });
      }

      const hotelExists = await Hotel.findById(hotelId);
      if (!hotelExists) {
        return res.status(404).json({ message: "Hotel not found" });
      }

      const index = user.wishlists.indexOf(hotelId);
      if (index === -1) {
          user.wishlists.push(hotelId); // Add hotel to wishlist
      } else {
          user.wishlists.splice(index, 1); // Remove from wishlist
      }

      await user.save();
      return res.status(200).json(
        new ApiResponse(200 , { wishlists: user.wishlists } , "Updated Successfully !" ))
  } 
  catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// Get all the Wishlist details of the User Controller Code
 const getWishlist = async (req, res) => {
  const { id } = req.params;
  try {
    if(!id){
      return res.status(400).json(
         new ApiError(400 ,"User ID is required!")
      )
   }
   if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json(
       new ApiError(400, "Invalid ID", "Invalid ID ! Failed to Show the User Wishlists details !")
    )
   }
      const user = await User.findById(id).populate('wishlists');

      if (!user) {
        return res.status(200).json(
          new ApiResponse(200 , "No WishList Found !")
        );
      }

      return res.status(200).json(
        new ApiResponse(200 , { wishlists: user.wishlists } , "All wishlists details"));
  }
  catch (error) {
    return  res.status(500).json({ message: "Internal Server Error", error });
  }
};

// User Account Edit Details Controller Code
const userAccountEditDetails = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json(new ApiError(400, "Invalid ID", "Invalid User ID!"));
    }

    let { name, username, email, phone, password } = req.body;
    console.log("USER EDIT REQUEST:", { name, username, email, phone });

    let cloudinaryResult = null;
    if (req.file) {
      cloudinaryResult = await uploadOnCloudinary(req.file.path);
    }

    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json(new ApiError(404, "User not found", "No user details found!"));
    }

    // Check for unique fields
    if (email && email !== existingUser.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) return res.status(400).json(new ApiError(400, ["Validation Error"] ,"Email already in use"));
    }

    if (username && username !== existingUser.username) {
      const usernameExists = await User.findOne({ username });
      if (usernameExists) return res.status(400).json(new ApiError(400, ["Validation Error"] , "Username already taken"));
    }

    if (phone && phone !== existingUser.phone) {
      const phoneExists = await User.findOne({ phone });
      if (phoneExists) return res.status(400).json(new ApiError(400,["Validation Error"],  "Phone number already in use"));
    }

    // Update user details
    existingUser.name = name || existingUser.name;
    existingUser.username = username || existingUser.username;
    existingUser.email = email || existingUser.email;
    existingUser.phone = phone || existingUser.phone;

    if (cloudinaryResult && cloudinaryResult.url) {
      existingUser.image = cloudinaryResult.url;
    }

    // **Update Password Safely with Passport-Local-Mongoose**
    if (password) {
      await existingUser.setPassword(password); // Passport will hash it automatically
    }

    await existingUser.save();

    console.log("User updated successfully!", existingUser);

    return res.status(200).json(new ApiResponse(200, { updatedUser: existingUser }, "User updated successfully!"));
  } catch (error) {
    console.error("Failed to update user!", error);
    return res.status(500).json({
      status:500,
      message:["Internal Server Error"],
      details:["Failed to update user !"],
      error:error
    }
    );
  }
});


// User Account Deletion Controller Code
const userAccountDelete = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Id=", id);
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json(new ApiError(400, "Invalid ID", "Invalid User ID!"));
    }
    console.log("User Id Deleted", id);
    const userExists = await User.findById(id);
    if(!userExists) {
      return res.status(404).json(
        new ApiError(404 , "User not found" , "User Does Not Exist !")
      )
    }
     await User.findByIdAndDelete(id);

    return res
      .status(200)
      .json(new ApiResponse(200, " Deleted Successfully !"));
  } 
  catch (error) {
    console.log("Failed to delete the user " + error);
    return res.status(400).json(new ApiError(400, "Invalid ID", "FAILED to delete the account"));
   
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
