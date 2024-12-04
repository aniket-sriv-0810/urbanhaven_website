import express from 'express';
import { validate } from '../middleware/validator.js';
import { upload } from '../multer.js';
import { createReview } from '../controller/review.controller.js';
import { allHotel ,  contactLogic,  newHotelCreation , showMyHotel , editMyHotel , deleteMyHotel} from '../controller/hotel.controller.js';
import { hotelSchemaValidation } from '../test/hotel.validator.js';
import { reviewSchemaValidation } from '../test/review.validator.js';
const router =  express.Router();

// Home Route Page
router
    .route('/')
    .get(allHotel)

// Register a New Hotel Route
router
    .route('/api/v1/new')
    .post( upload.single('image') ,validate(hotelSchemaValidation) ,newHotelCreation )

// Contact Information  Route
router
    .route('/api/v1/contact')
    .get(contactLogic)

// Show a Particular Hotel Route
router
     .route('/api/v1/hotel/:id')
     .get(showMyHotel)

// Edit a Particular Hotel Route
router
     .route('/api/v1/hotel/:id/edit')
     .put(upload.single('image'),validate(hotelSchemaValidation),editMyHotel)

// Delete a Particular Hotel Route
router
     .route('/api/v1/hotel/:id/delete')
     .delete(deleteMyHotel)


 // Create a new Review
router
     .route('/api/v1/hotel/:id/review')
     .post(validate(reviewSchemaValidation),createReview)





export default router ;