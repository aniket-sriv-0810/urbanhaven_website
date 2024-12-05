import { User } from '../model/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
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
     return res.status(200).json(
        new ApiResponse(200 , {registerNewUser},  "Successfully registered the new User !")
     );
   } 
   catch (error) {
    throw new ApiError(400 ,  error , "Failed to register user !");
   }

})

// Login the Registered User
const loginUser = asyncHandler(async (req, res) => {
   try {
      const {user} = req;
    console.log("body => " , req.body);

    console.log("Logged in successfully !");
    return res.status(200).json(
      new ApiResponse(200 , {user} , "Logged in successfully !")
    )
    
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

export {createNewUser , loginUser , logOutUser};