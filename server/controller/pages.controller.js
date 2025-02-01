import Contact from '../model/contact.model.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import {User} from '../model/user.model.js'
const contactLogic = asyncHandler ( async ( req , res) => {
  try {
      const {user , message} = req.body ;
     const checkUser = await User.findById(user);
    if( !checkUser)
        throw new ApiError (400 , "User not found !");

      const contact = await Contact ({ user , message})
      await contact.save();
      return res.json(
        new ApiResponse(200 , {contact} , "Feedback Saved successfully!"));
  } catch (error) {
    throw new ApiError(400 , error , "Unable to save feedback !");
  }
});


export {contactLogic}
