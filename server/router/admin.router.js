import express from 'express';
import { validate } from '../middleware/validator.js';
import {  upload } from '../multer.js';
import { hotelSchemaValidation } from '../test/hotel.validator.js';
import { adminHotelData, adminUserData , adminBookingData, adminContactData, adminDashboardData } from '../controller/admin.controller.js';
import {newHotelCreation ,  editMyHotel ,  deleteMyHotel} from '../controller/hotel.controller.js';
import { isLoggedIn } from '../middleware/authentication.js';

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


// Edit the Hotel details in the website Route
router
     .route('/hotel-details/:id/edit')
     .put(isLoggedIn ,upload.single('image') ,editMyHotel)


// Delete a Particular Hotel Route
router
     .route('/hotel/:id/delete')
     .delete( isLoggedIn ,deleteMyHotel)


export default router;
