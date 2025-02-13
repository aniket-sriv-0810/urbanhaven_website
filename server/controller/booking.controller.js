import Booking from '../model/booking.model.js';
import Hotel from '../model/hotel.model.js';
import { User } from '../model/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import {sendBookingConfirmation}  from '../utils/EmailService.js';
import mongoose from 'mongoose';

// Booking hotel controller code
const bookingHotel = asyncHandler( async (req , res ) => {

    try {
        let {id} = req.params;
             if(!id){
                    return res.status(400).json(
                       new ApiError(400 ,"Hotel ID is required!")
                    )
                 }
                 if (!mongoose.Types.ObjectId.isValid(id)) {
                  return res.status(400).json(
                     new ApiError(400, "Invalid ID", "Invalid ID ! Failed to Show the Hotel Booking !")
                  )
                 }

        const { checkInDate , checkOutDate ,room , adultCount ,totalAmount, infantCount, paymentDetails , status  , userDetails , hotelDetails} = req.body;
        if (!req.user) {
            return res.status(401).json(new ApiError(401, "Unauthorized", "User must be logged in to book!"));
        }
        if (!mongoose.Types.ObjectId.isValid(userDetails)) {
            return res.status(400).json(new ApiError(400, "Invalid User ID", "Invalid user ID provided!"));
        }
        if (!mongoose.Types.ObjectId.isValid(hotelDetails)) {
            return res.status(400).json(new ApiError(400, "Invalid Hotel ID", "Invalid hotel ID provided!"));
        }

        const newBooking = new Booking({
            userDetails: new mongoose.Types.ObjectId(userDetails),
            hotelDetails: new mongoose.Types.ObjectId(hotelDetails),
            checkInDate, checkOutDate, room, adultCount, infantCount, totalAmount, paymentDetails, status
        });

        if (!newBooking){
            return res.status(404).json(
                new ApiError(404 , "Booking Details not found !")
            )
           }

   // Fetch user details to get email
   const user = await User.findById(req.user._id);
    
   if (!user){
    return res.status(404).json(
        new ApiError(404 , "User not found !")
    )
   }

    // Push the booking ID into the user's bookings array
    user.bookings.push(newBooking._id);
    await user.save();


//    // Prepare email data
//    const bookingDetails = {
//      title: hotelDetails.title,
//      city: hotelDetails.city,
//      state: hotelDetails.state,
//      country: hotelDetails.country,
//      checkInDate,
//      checkOutDate,
//      paymentDetails,
//    };

//    // Send confirmation email
//    let emailSent = false;
//    try {
//      await sendBookingConfirmation(user.email, bookingDetails);
//      emailSent = true;
//    } catch (emailError) {
//      console.error("Error sending email:", emailError);
//    }


        await newBooking.save();
        console.log("Booking Confirmed Successfully !" , newBooking);
        return res.status(200).json( 
            new ApiResponse(200, {newBooking } , "Booking Confirmed Successfully !")
        )
    }
    catch (error) {
        return res.status(400).json(
        new ApiError(400 , null , "Booking Failed !" , false , error)
        )
    }
});

// Confirmation of Booking hotel controller code
const confirmationDetails = asyncHandler( async ( req , res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json(
               new ApiError(400 ,"Booking ID is required!")
            )
         }
         if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json(
             new ApiError(400, "Invalid ID", "Invalid ID ! Failed to Show the Confirmation Page !")
          )
         }

        const booking = await Booking.findById(id)
        .populate('userDetails', 'name email phone') // Fetch specific fields from User
        .populate('hotelDetails', 'title city image'); // Fetch specific fields from Hotel;

        if(!booking){
            return res.status(404).json(
               new ApiError(404 ,"Booking details are required!")
            )
         }

        console.log("Fetching booking details...");
        return res.status(200).json(
            new ApiResponse(200 , {booking}, "All Booking Status fetched !")
        )
    } catch (error) {
        return res.status(400).json(
            new ApiError(400 , error , "Fetching booking details failed !")
        )
    }
})
export {bookingHotel , confirmationDetails}