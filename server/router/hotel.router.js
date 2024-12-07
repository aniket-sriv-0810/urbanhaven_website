import express from 'express';
import { isLoggedIn } from '../middleware/authentication.js';
import { validate } from '../middleware/validator.js';

import { createReview } from '../controller/review.controller.js';
import { allHotel ,  contactLogic,    showMyHotel  } from '../controller/hotel.controller.js';

import { reviewSchemaValidation } from '../test/review.validator.js';
const router =  express.Router();

// Home Route Page
router
    .route('/')
    .get(allHotel)

// Contact Information  Route
router
    .route('/api/v1/contact')
    .get(contactLogic)

// Show a Particular Hotel Route
router
     .route('/api/v1/hotel/:id')
     .get(  isLoggedIn ,showMyHotel)




 // Create a new Review
router
     .route('/api/v1/hotel/:id/review')
     .post( isLoggedIn ,validate(reviewSchemaValidation),createReview)





export default router ;