import {User} from '../model/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import Hotel from '../model/hotel.model.js';
import Booking from '../model/booking.model.js';

const adminUserData =  asyncHandler( async (req , res) => {
    try {

        const allUserDetails = await User.find({});
        console.log("Fetching admin user data...");
        return res.status(200).json(
            new ApiResponse(200 , {allUserDetails} , "All Registered Users details !")
        )
    } catch (error) {
            throw new ApiError(400 ,null , "Unable to Fetch User Details");
    }
});


const adminHotelData = asyncHandler(async ( req , res ) => {
    try {
        const allHotelDetails = await Hotel.find({});
        console.log("Fetching hotel details ...");
        return res.status(200).json(
            new ApiResponse(200 , {allHotelDetails} , " All hotel details fetched !")
        )        
    } catch (error) {
        throw new ApiError(400 , null , "Failed to fetch all hotel details !");
    }
})

const adminBookingData = asyncHandler(async ( req , res ) => {
    try {
        const bookingDetails = await Booking.find({});
        console.log("Fetching booking details...");
        return res.status(200).json(
            new ApiResponse(200 , {bookingDetails}, "All Booking Status fetched !")
        )
    } catch (error) {
        throw new ApiError(400 , error , "Fetching booking details failed !")
    }
})

export {adminUserData , adminHotelData , adminBookingData};
