import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";
import passport from "passport";


//Register a new User Logic
const createNewUser = asyncHandler(async (req, res) => {
  try {
    const { name, username, phone, email, password } = req.body;
    console.log("req.file =>" + req.file);
    
    const existingUsername = await User.findOne({ username });
    const existingPhone = await User.findOne({ phone });
    const existingEmail = await User.findOne({ email : email.toLowerCase() });
    // If any of the checks return a result, throw an error
    if (existingUsername) {
      return res.status(400).json({
        status: 400,
        message: "Validation Error",
        details: ["Username already exists"],
      });
    }
    if (existingPhone) {
      return res.status(400).json({
        status: 400,
        message: "Validation Error",
        details: ["Phone number already registered"],
      });
    }
    if (existingEmail) {
      return res.status(400).json({
        status: 400,
        message: "Validation Error",
        details: ["Email already registered"],
      });
    }
    
    const imageUrl = req.file ? await uploadOnCloudinary(req.file.path) : null;
    const newUser = new User({
      name,
      username,
      phone,
      email,
      image: imageUrl
        ? imageUrl.url
        : "https://e7.pngegg.com/pngimages/81/570/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png"
    });
    const registerNewUser = await User.register(newUser, password);

    console.log("User Registered Successfully");
    //Auto Login after registration
    req.login(registerNewUser, (err) => {
      if (err) {
        throw new ApiError(500, err, "Auto-login after registration failed!");
      }
      console.log("Auto Login Successfully !");

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { registerNewUser },
            "Successfully registered the new User !"
          )
        );
    });
  } catch (error) {
    throw new ApiError(400, error, "Failed to register user !");
  }
});

// Login the Registered User
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { username , password } = req.body;
  
  
      if (!username || !password) {
        return res.status(400).json({
          status: 400,
          message: "Validation Error",
          details: ["Username and Password are required !"],
        });
      }
    const loggedInUser = await User.findOne({username});
    // Use passport.authenticate for proper validation
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          message: "Unexpected server error occurred!",
          details: [err.message],
        });
      }
      if (!user) {
        return res.status(401).json({
          status: 401,
          message: "Invalid Credentials!",
          details: [info?.message || "Authentication failed."],
        });
      }

      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({
            status: 500,
            message: "Login failed",
            details: ["Unexpected server error occurred!"],
          });
        }
        console.log("Body : ", req.body);
        
        return res.status(200).json({
          status: 200,
          data: { loggedInUser },
          message: "Successfully logged in the User!",
        });
      });
    })(req, res); // Execute passport.authenticate
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to log in",
      details: [error.message || "An unexpected error occurred!"],
    });
  }
});

const logOutUser = asyncHandler(async (req, res, next) => {
  try {
    req.logout((err) => {
      if (err) {
        throw new ApiError(400, err, "Failed to logout !");
        return next(err);
      }
      req.session.destroy((err) => {
        if (err) {
          console.error("Failed to destroy session:", err);
          throw new ApiError(500, err, "Failed to log out!");
        }
      });
      return res
        .status(200)
        .json(new ApiResponse(200, null, "Logged out successfully"));
    });
  } catch (error) {
    throw new ApiError(400, error, "Logout  failed !");
  }
});

// Checks the authentication of the user - login or not
const checkAuthentication = asyncHandler(async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      console.log("user is authenticated and data", req.user);
      const user = req.user;
      console.log("User is authenticated !");
      return res
        .status(200)
        .json(new ApiResponse(200, { isAuthenticated: true, user }));
    } else {
      console.log("user not authenticated yet !");

      res.status(200).json(new ApiResponse(200, { isAuthenticated: false }));
    }
  } catch (error) {
    console.log("Error in User Authentication !", error);
  }
});


export {
    createNewUser,
    loginUser,
    logOutUser,
    checkAuthentication,
  };