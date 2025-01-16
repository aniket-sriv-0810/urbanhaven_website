import Booking from '../model/booking.model.js';
import Hotel from '../model/hotel.model.js';
import { User } from '../model/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import mongoose from 'mongoose';

const bookingHotel = asyncHandler( async (req , res ) => {
    /*
    1. check the hotel id
    2. fetch all the details from the form
    3. store in db about the booking and the hotel which is booked !
    */
    try {
        let {id} = req.params;
         if(!id){
                 throw new ApiError(400 ,"Hotel ID is required!");
            }
            if (!mongoose.Types.ObjectId.isValid(id)) {
              throw new ApiError(400, "Invalid ID", "Failed to Show the Hotel!");
            }
            const hotelDetails = await Hotel.findById(id);
            if (!hotelDetails) {
                throw new ApiError(400, "Hotel not found!");
            }
            if (!req.user) {
                throw new ApiError(401, "User not logged in!");
            }
        const { checkInDate , checkOutDate ,room , adultCount ,totalAmount, infantCount, paymentDetails , status} = req.body;

        const newBooking = new Booking({
            userDetails: req.user._id,  // Assuming the user is logged in and stored in req.user
    hotelDetails: hotelDetails._id, 
    checkInDate, checkOutDate , room ,adultCount , infantCount, totalAmount,
            paymentDetails, status 
        })
        await newBooking.save();
        console.log("Booking Confirmed Successfully !" , newBooking);
        return res.status(200).json( 
            new ApiResponse(200, {newBooking} , "Booking Confirmed Successfully !")
        )
        
    } catch (error) {
        throw new ApiError(400 , error , "Booking Failed !");
    }
});

const confirmationDetails = asyncHandler( async ( req , res) => {
    try {
        const {id} = req.params;
        const booking = await Booking.findById(id)
        .populate('userDetails', 'name email phone') // Fetch specific fields from User
        .populate('hotelDetails', 'title city image'); // Fetch specific fields from Hotel;
        console.log("Fetching booking details...");
        return res.status(200).json(
            new ApiResponse(200 , {booking}, "All Booking Status fetched !")
        )
    } catch (error) {
        throw new ApiError(400 , error , "Fetching booking details failed !")
    }
})
export {bookingHotel , confirmationDetails}