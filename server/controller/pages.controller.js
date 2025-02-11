import Contact from '../model/contact.model.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import {User} from '../model/user.model.js'
import Faq from '../model/faq.model.js';
const contactLogic = asyncHandler ( async ( req , res) => {
  try {
      const { user , message} = req.body ;

      const contact = new Contact ({ user , message})
      await contact.save();
      console.log("Contact Saved successfully !");
      
      return res.json(
        new ApiResponse(200 , {contact} , "Feedback Saved successfully!"));
  } catch (error) {
    throw new ApiError(400 , error , "Unable to save feedback !");
  }
});

const faqData = asyncHandler( async ( req , res) => {
  try {
    const faq = await Faq.find({});
    if(!faq)
      throw new ApiError(400 , "Failed to Find FAQs");
    return res.json( 
      new ApiResponse(200 , {faq} , "FAQS fetched successfully!")
    )
  } catch (error) {
    throw new ApiError(400 , error , "Unable to fetch FAQs !");
  }
});


export {contactLogic , faqData}
