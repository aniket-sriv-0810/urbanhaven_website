import express from 'express';
import { isLoggedIn } from '../middleware/authentication.js';
import { validate } from '../middleware/validator.js';
import { createReview } from '../controller/review.controller.js';
import { allHotel , showMyHotel, searchHotels , getHotelReviewStats  } from '../controller/hotel.controller.js';
import { contactLogic } from '../controller/pages.controller.js';
import { bookingHotel, confirmationDetails } from '../controller/booking.controller.js';
import { reviewSchemaValidation } from '../test/review.validator.js';
import {bookingSchemaValidation } from '../test/booking.validator.js';




const router =  express.Router();

//CORE Route - '/'

// Home Route Page
router
    .route('/')
    .get(allHotel)


// Search Route Page
    router
    .get("/search", searchHotels);


// Show a Particular Hotel Route
router
     .route('/v1/hotel/:id')
     .get( isLoggedIn, showMyHotel)


// Show a Particular Hotel Review Count Route
router
     .route('/v1/hotel/:id/review-stats')
     .get(  getHotelReviewStats)


 // Create a new Review for a particular hotel Route
router
     .route('/v1/hotel/:id/review')
     .post( isLoggedIn , validate(reviewSchemaValidation),createReview)


// Booking  a particular hotel Route
router
      .route('/v1/hotel/:id/booking')
      .post(isLoggedIn , validate(bookingSchemaValidation)  ,bookingHotel)


// Confirmation page Route
router
      .route('/v1/booking/:id')
      .get(isLoggedIn, confirmationDetails)


export default router ;