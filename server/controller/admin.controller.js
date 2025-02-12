import {User} from '../model/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import Hotel from '../model/hotel.model.js';
import Booking from '../model/booking.model.js';
import Contact from '../model/contact.model.js';

// Admin Dashboard details controller code
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

        if( !totalHotels || !totalContacts || !totalBookings || !totalUsers){
            return res.status(404).json({
                status:400,
                message: "Data Not Found",
                details: ["Data is unavailable !"]
            })
        }
        // Return the response
      return res.status(200).json(
            new ApiResponse(200, {
                totalUsers,
                totalHotels,
                totalBookings,
                totalContacts
            }, "Admin Dashboard Data Fetched Successfully")
        );
    }
    catch (error) {
        return res.status(400).json(
            new ApiError(400, "Failed to fetch admin dashboard data")
        )
    }
});

// Total Registered Users details controller code
const adminUserData =  asyncHandler( async (req , res) => {
    try {

        const allUserDetails = await User.find({});

        if(!allUserDetails){
            return res.status(404).json({
                status:404,
                message: "Service Unavailable",
                details: ["User data is unavailable"]
            })
        }
        console.log("Fetching admin user data...");

        return res.status(200).json(
            new ApiResponse(200 , {allUserDetails} , "All Registered Users details !")
        )
    }
    catch (error) {
        return res.status(400).json(
            new ApiError(400 ,null , "Unable to Fetch User Details")
        )
    }
});


// Total Listing of Hotels details controller code
const adminHotelData = asyncHandler(async ( req , res ) => {
    try {
        const allHotelDetails = await Hotel.find({});

        if(!allHotelDetails){
            return res.status(404).json({
                status:404,
                message: "Service Unavailable",
                details: ["Hotel data is unavailable"]
            })
        }
        console.log("Fetching hotel details ...");
        return res.status(200).json(
            new ApiResponse(200 , {allHotelDetails} , " All hotel details fetched !")
        )
    }
    catch (error) {
        return res.status(400).json(
            new ApiError(400 ,null , "Unable to Fetch Hotel Details")
        )}
})

// Total Listing of Bookings details controller code
const adminBookingData = asyncHandler(async ( req , res ) => {
    try {
        const bookingDetails = await Booking.find({})
        .populate('userDetails', 'name email phone') // Fetch specific fields from User
        .populate('hotelDetails', 'title city image'); // Fetch specific fields from Hotel;

        if(!bookingDetails){
            return res.status(404).json({
                status:404,
                message: "Service Unavailable",
                details: ["Booking data is unavailable"]
            })
        }
        console.log("Fetching booking details...");
        return res.status(200).json(
            new ApiResponse(200 , {bookingDetails}, "All Booking Status fetched !")
        )
    } catch (error) {
        return res.status(400).json(
            new ApiError(400 ,null , "Unable to Fetch Booking Details")
        )}
})

// Total Listing of Contacts details controller code
const adminContactData = asyncHandler ( async (req , res) => {
    try {
        const contactData = await Contact.find({}).populate("user","name phone email")
        if(!contactData){
            return res.status(404).json({
                status:404,
                message: "Service Unavailable",
                details: ["Feedback data is unavailable"]
            })
        }
        console.log("Fetching contact data...");
        return res.json (
            new ApiResponse(200 , {contactData} , "success in fetching the data..." ));
    }
    catch (error) {
        return res.status(400).json(
            new ApiError(400 ,null , "Unable to Fetch Contact Details")
        )}
});

export {adminDashboardData, adminUserData , adminHotelData , adminBookingData , adminContactData};
