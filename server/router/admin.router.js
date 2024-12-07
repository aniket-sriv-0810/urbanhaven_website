import express from 'express';
import { validate } from '../middleware/validator.js';
import { upload } from '../multer.js';
import { hotelSchemaValidation } from '../test/hotel.validator.js';
import { adminHotelData, adminUserData } from '../controller/admin.controller.js';
import {newHotelCreation ,  editMyHotel ,  deleteMyHotel} from '../controller/hotel.controller.js';
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
     .post( isLoggedIn , upload.single('image') ,validate(hotelSchemaValidation) ,newHotelCreation )

// Edit the Hotel details in the website Route
router
     .route('/hotel-details/:id/edit')
     .put(isLoggedIn ,upload.single('image'),validate(hotelSchemaValidation),editMyHotel)


// Delete a Particular Hotel Route
router
     .route('/hotel/:id/delete')
     .delete( isLoggedIn ,deleteMyHotel)
export default router;
