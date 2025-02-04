import {User} from '../model/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import Hotel from '../model/hotel.model.js';
import Booking from '../model/booking.model.js';
import Contact from '../model/contact.model.js';


const adminDashboardData = asyncHandler(async (req, res) => {
    try {
        // Count total users
        const totalUsers = await User.countDocuments();

        // Count total hotels
        const totalHotels = await Hotel.countDocuments();

        // Count total bookings
        const totalBookings = await Booking.countDocuments();

        // Count total contact messages
        const totalContacts = await Contact.countDocuments();

        // Return the response
        res.status(200).json(
            new ApiResponse(200, {
                totalUsers,
                totalHotels,
                totalBookings,
                totalContacts
            }, "Admin Dashboard Data Fetched Successfully")
        );
    } catch (error) {
        throw new ApiError(500, "Failed to fetch admin dashboard data");
    }
});

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
        const bookingDetails = await Booking.find({})
        .populate('userDetails', 'name email phone') // Fetch specific fields from User
        .populate('hotelDetails', 'title city image'); // Fetch specific fields from Hotel;
        console.log("Fetching booking details...");
        return res.status(200).json(
            new ApiResponse(200 , {bookingDetails}, "All Booking Status fetched !")
        )
    } catch (error) {
        throw new ApiError(400 , error , "Fetching booking details failed !")
    }
})

const adminContactData = asyncHandler ( async (req , res) => {
    try {
        const contactData = await Contact.find({}).populate("user","name phone , email")
        console.log("Fetching contact data...");
        return res.json ( 
            new ApiResponse(200 , {contactData} , "success in fetching the data..." ));
    } catch (error) {
        throw new ApiError (400 , error , "Fetching contact data failed !");
    }
});

export {adminDashboardData, adminUserData , adminHotelData , adminBookingData , adminContactData};
