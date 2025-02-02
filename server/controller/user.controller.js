import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";
import passport from "passport";

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
  userAccountEditDetails,
  userAccountDelete
};
