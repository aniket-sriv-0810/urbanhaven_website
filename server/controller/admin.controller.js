import {User} from '../model/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import Hotel from '../model/hotel.model.js';
import Booking from '../model/booking.model.js';
import Contact from '../model/contact.model.js';
import mongoose from 'mongoose';
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

/**
 * Delete a booking by Admin
 * - Removes the booking from the Booking model
 * - Removes the booking reference from the User model
 * - Ensures only admins can perform this action
 */
const deleteBookingByAdmin = asyncHandler(async (req, res) => {
    try {
      const { bookingId } = req.params;
  
      // Validate Booking ID
      if (!mongoose.Types.ObjectId.isValid(bookingId)) {
        return res.status(400).json(new ApiError(400, "Invalid Booking ID", "Invalid Booking ID format!"));
      }
  
      // Find the booking
      const booking = await Booking.findById(bookingId);
      if (!booking) {
        return res.status(404).json(new ApiError(404, "Booking Not Found", "No booking exists with this ID!"));
      }
  
      // Remove booking from the Booking model
      await Booking.findByIdAndDelete(bookingId);
  
      // Remove booking reference from User model
      await User.findByIdAndUpdate(booking.userDetails, { $pull: { bookings: bookingId } });
  
      console.log("Booking successfully deleted by Admin!");
  
      return res.status(200).json(new ApiResponse(200, "Booking deleted successfully!", null));
    } catch (error) {
      console.error("Failed to delete booking by Admin!", error);
      return res.status(500).json(
        new ApiError(500, "Server Error", "Failed to delete the booking", error)
      );
    }
  });

  /**
 * Delete a feedbacks by Admin
 * - Removes the feedback from the Contact model
 * - Removes the feedback reference from the User model
 * - Ensures only admins can perform this action
 */
  const deleteFeedbackByAdmin = asyncHandler(async (req, res) => {
    try {
      const { contactId } = req.params;
  
      // Validate Booking ID
      if (!mongoose.Types.ObjectId.isValid(contactId)) {
        return res.status(400).json(new ApiError(400, "Invalid Feedback ID", "Invalid Feedback ID format!"));
      }
  
      // Find the booking
      const feedback = await Contact.findById(contactId);
      if (!feedback) {
        return res.status(404).json(new ApiError(404, "Feedback Not Found", "No feedback exists with this ID!"));
      }
  
      // Remove booking from the Booking model
      await Contact.findByIdAndDelete(contactId);
  
      // Remove booking reference from User model
      await User.findByIdAndUpdate(feedback.userDetails, { $pull: { bookings: contactId } });
  
      console.log("Feedback successfully deleted by Admin!");
  
      return res.status(200).json(new ApiResponse(200, "Feedback deleted successfully!", null));
    } catch (error) {
      console.error("Failed to delete feedback by Admin!", error);
      return res.status(500).json(
        new ApiError(500, "Server Error", "Failed to delete the feedback", error)
      );
    }
  });

export {adminDashboardData, adminUserData , adminHotelData , adminBookingData , adminContactData , deleteBookingByAdmin , deleteFeedbackByAdmin};
