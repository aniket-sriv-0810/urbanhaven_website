import express from 'express';
import { adminHotelData, adminUserData } from '../controller/admin.controller.js';
import { isLoggedIn } from '../middleware/authentication.js';
const router = express.Router();


// All Registered Users detailed  Route!
router
     .route('/users')
     .get( isLoggedIn,adminUserData)

// All Registered Users detailed  Route!
router
     .route('/hotels')
     .get( isLoggedIn,adminHotelData)

// All Contact Queries detailed Route !
router
     .route('/contacts')

// Register a new Hotel in the website Route
router
     .route('/new-hotel')

export default router;
