import Contact from '../model/contact.model.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import { User } from '../model/user.model.js';
import Faq from '../model/faq.model.js';

// Contact / Feedback Controller code
const contactLogic = asyncHandler ( async ( req , res) => {
  try {
      const { user , message} = req.body ;

    if(!user){
      return res.status(404).json({
        status:404,
        message:"Validation Error",
        details:["User Details are required !"]
      })
    }
    const userExists = await User.findById(user);
    if(!userExists){
      return res.status(404).json({
        status:404,
        message:"Validation Error",
        details:["User is not yet registered  !"]
      })
    }
      const contact = new Contact ({ user , message});
      if(!contact){
        return res.status(404).json({
          status:400,
          message: "Validation Error",
          details: ["Contact saving failure occurred ! "]
        })
      }
      await contact.save();
      console.log("Contact Saved successfully !");

      return res.status(200).json(
        new ApiResponse(200 , {contact} , "Feedback Saved successfully!"));
  } 
  catch (error) {
    return res.status(400).json(
      new ApiError(400 , error , "Unable to save feedback !")
    )
  }
});


// Fetching the FAQs details from the database controller code
const faqData = asyncHandler( async ( req , res) => {
  try {
    const faq = await Faq.find({});

    if(!faq){
      return res.status(404).json({
        status:404,
        message:"Service not found ",
        details :["Unable to find FAQs"]
      })
    }

    return res.status(200).json(
      new ApiResponse(200 , {faq} , "FAQS fetched successfully!")
    )
  }
   catch (error) {
    return res.status(400).json(
      new ApiError(400 , error , "Unable to fetch FAQs !")
    )
  }
});


export {contactLogic , faqData}
