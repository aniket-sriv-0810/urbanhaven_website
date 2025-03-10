import express from 'express';
import { validate } from '../middleware/validator.js';
import {  upload } from '../multer.js';
import { hotelSchemaValidation } from '../test/hotel.validator.js';
import { blogSchemaValidation } from '../test/blog.validator.js';
import { adminHotelData, deleteBookingByAdmin, adminUserData , adminBookingData, adminContactData, adminDashboardData, deleteFeedbackByAdmin } from '../controller/admin.controller.js';
import {newHotelCreation ,  editMyHotel ,  deleteMyHotel} from '../controller/hotel.controller.js';
import { isLoggedIn } from '../middleware/authentication.js';
import { createBlog , editBlog , deleteBlog } from '../controller/blog.controller.js';
const router = express.Router();

// CORE Route - /v1/admin

// Admin Dashboard Data Route
router
     .route('/')
     .get(isLoggedIn , adminDashboardData)


// All Registered Users details Route
router
     .route('/users')
     .get( isLoggedIn,adminUserData)


// All Listed Hotels details Route
router
     .route('/hotels')
     .get( isLoggedIn,adminHotelData)


// All Booking Details Route
router
     .route('/bookings')
     .get( isLoggedIn,adminBookingData)


// All Contact & Feedbacks details Route
router
     .route('/contacts')
     .get( isLoggedIn,adminContactData)


// Register a new Hotel in the website Route
router
     .route('/new-hotel')
     .post( isLoggedIn , upload.single('image') ,validate(hotelSchemaValidation) ,newHotelCreation )

// Create a new Blog Route
router
    .route('/add-blog')
    .post(isLoggedIn , upload.single('image') ,validate(blogSchemaValidation) , createBlog)


// Edit the Hotel details in the website Route
router
     .route('/hotel-details/:id/edit')
     .put(isLoggedIn ,upload.single('image') ,editMyHotel)


// Edit a particular Blog Route
router
     .route('/blog/:id/edit')
     .put(isLoggedIn , upload.single('image') , validate(blogSchemaValidation) , editBlog)



// Delete a Particular Hotel Route
router
     .route('/hotel/:id/delete')
     .delete( isLoggedIn ,deleteMyHotel)

// Delete a particular Blog Route
router
     .route('/blog/:id/delete')
     .delete(isLoggedIn , deleteBlog)

// DELETE: Admin deletes a booking
router
     .delete("/booking/:bookingId", deleteBookingByAdmin);

// DELETE: Admin deletes a booking
router
     .delete("/contact/:contactId", deleteFeedbackByAdmin);


export default router;
