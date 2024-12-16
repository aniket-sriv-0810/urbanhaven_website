import { User } from '../model/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import mongoose from 'mongoose';
import passport from 'passport';


//Register a new User Logic
const createNewUser = asyncHandler(async(req , res) => {
   try {

     const {name , username , phone , email , password} = req.body;
 console.log("req.file =>" + req.file);
 const imageUrl = req.file ? await uploadOnCloudinary(req.file.path) : null;
     const newUser = new User ({ name , username , phone , email , image:imageUrl ? imageUrl.url : "https://e7.pngegg.com/pngimages/81/570/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png"});
     const registerNewUser = await User.register(newUser , password)
 
 
     console.log("User Registered Successfully");
     //Auto Login after registration
     req.login(registerNewUser , (err) => {
      if(err){
         throw new ApiError(500, err, "Auto-login after registration failed!");
   }
      return res.status(200).json(
         new ApiResponse(200 , {registerNewUser : { name : registerNewUser.name}},  "Successfully registered the new User !")
      );
   })
   } 
   catch (error) {
    throw new ApiError(400 ,  error , "Failed to register user !");
   }

})

// Login the Registered User
const loginUser = asyncHandler(async (req, res) => {
   try {
      const {username} = req.body
    console.log("body => " , req.body);
    console.log("Logged in successfully !");

    const loggedInUser = await User.findOne({username})
    if (!loggedInUser) {
      throw new ApiError(401, null, "Invalid username or password!");
    }
    req.login(loggedInUser , (err) => {
      if(err){
         throw new ApiError(500, err, "Login failed!");
   }

      return res.status(200).json(
         new ApiResponse(200 , {loggedInUser :{_id: loggedInUser._id,name : loggedInUser.name , username : loggedInUser.username, email: loggedInUser.email, image: loggedInUser.image }},  "Successfully logged in the User !")
      );
   })
    
   } catch (error) {
      throw new ApiError(400, error, "Failed to log in!");
   }
 });


const logOutUser = asyncHandler(async (req , res , next) => {
   try {
     req.logout((err) => {
         if(err){
            throw new ApiError(400 , err , "Failed to logout !")
            return next(err);
         }
         req.session.destroy((err) => {
            if (err) {
               console.error("Failed to destroy session:", err);
               throw new ApiError(500, err, "Failed to log out!");
             }
         })
        return res.status(200).json(
            new ApiResponse(200, null,"Logged out successfully")
        );
     })
   }
    catch (error) {
   throw new ApiError(400 , error ,"Logout  failed !") 
   }
});

// Checks the authentication of the user - login or not
const checkAuthentication = asyncHandler( async ( req , res ) => {
 
  try {
    if(req.isAuthenticated()){

      console.log("user is authenticated and data" , req.user);
      
       console.log("User is authenticated !");
       return res.status(200).json(
          new ApiResponse(200 , {isAuthenticated : true , user: {
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            username: req.user.username,
            image : req.user.image,
          },
         })
       )
    }
    else{
    console.log("user not authenticated yet !");
 
       res.status(200).json(new ApiResponse(200 , {isAuthenticated : false}))
    }
  } catch (error) {
   console.log("Error in User Authentication !", error);
   
  }
} )

// User Account Details
const userAccountDetails = asyncHandler(async( req , res) => {
try {
      const {id} = req.params;
      console.log("Id=", id);
      if (!mongoose.Types.ObjectId.isValid(id)) {
         throw new ApiError(400, null, "User ID is invalid!");
       }
      const userInfo = await User.findById(id);
      if(!userInfo)
         throw new ApiError(400 , null , "user doesn't exist")
      console.log("User Info =>" , userInfo);
   
      return res.status(200).json(
         new ApiResponse(200, {userInfo} , "User detailed !")
      )
}
 catch (error) {
   console.error("User data fetch error", error);
}
});

// User Account Edit Details
const userAccountEditDetails = asyncHandler( async ( req , res) => {
  try {
    const {id} = req.params;
    console.log("Id=", id);
       if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new ApiError(400, null, "User ID is invalid!");
        }
    const {name , username , email , phone } = req.body;
    console.log("------------USER EDIT-----------");
    console.log(name, username, email, phone);
    
    
    console.log("Req.file =>" , req.file);
    let cloudinaryResult = null;
 
    if (req.file) {
       // Upload the file to Cloudinary
       cloudinaryResult = await uploadOnCloudinary(req.file.path);
     }
 
     const updatedUserData = {
       name , username , email , phone
     }
 
     if (cloudinaryResult && cloudinaryResult.url) {
       updatedUserData.image = cloudinaryResult.url;
     }
 
     const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, {
       new: true,
       runValidators: true,
     });
     if(!updatedUserData){
       throw new ApiError(400,"Couldn't find updated user !" , "Something went wrong")
     }
     console.log("user updated !", updatedUser);
     
    return  res.status(200).json(new ApiResponse(200, {updatedUser} , "user Updated Successfully !"));
      
  } catch (error) {
   console.error("Failed to update user !" , error);
   
  }
});

// User Account Deletion
const userAccountDelete = asyncHandler( async ( req , res) => {
  try {
    const {id} = req.params;
    console.log("Id=", id);
       if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new ApiError(400, null, "User ID is invalid!");
        }
        console.log("User Id Deleted" , id);
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
          throw new ApiError(400,"Unable to delete the hotel !")
        }
        return res.status(200).json(
          new ApiResponse(200 , " Deleted Successfully !")
        );
  } catch (error) {
   console.log("Failed to delete the user " + error);
   
  }
});

export {createNewUser , loginUser , logOutUser , checkAuthentication , userAccountDetails , userAccountEditDetails , userAccountDelete};