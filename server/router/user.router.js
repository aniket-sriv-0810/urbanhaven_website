import express from 'express';
import {validate} from '../middleware/validator.js';
import {checkLogInUser} from '../middleware/auth.middleware.js';
import {  upload } from '../multer.js';
import { createNewUser, loginUser , logOutUser , checkAuthentication} from '../controller/user-authentication.controller.js';
import { userAccountDetails , userAccountEditDetails , userAccountDelete, userBookingDetails, cancelBooking , getWishlist , toggleWishlist} from '../controller/user.controller.js';
import {userSchemaValidation} from '../test/user.validator.js'
import passport from 'passport';
import { ApiResponse } from '../utils/ApiResponse.js';
import { allHotel } from '../controller/hotel.controller.js';
import { loginUserValidation } from '../test/login.validator.js';
import { isLoggedIn } from '../middleware/authentication.js';
const router = express.Router();

// CORE Route - /v1/user

// Register a New user Route
router
     .route('/register')
     .post( validate(userSchemaValidation) , createNewUser);


// Login of the registered user Route
router
     .route('/login')
     .post( validate(loginUserValidation) ,loginUser);


// Logout of the registered user Route
router
     .route('/logout')
     .post(logOutUser);


// Check for the user authentication Route
router
     .route('/auth')
     .get(checkAuthentication)


// User Account Details Route
router
     .route('/:id/account')
     .get( isLoggedIn,userAccountDetails)


// User Account WishLists Details Route
router
     .route('/:id/account/wishlists')
     .get( isLoggedIn,getWishlist)


// User Account - ADD & REMOVE WishLists Route
router
     .route('/:id/account/wishlist')
     .post( isLoggedIn,toggleWishlist)


// User Account Bookings Details Route
router
     .route('/:id/account/bookings')
     .get( isLoggedIn,userBookingDetails)


// User Account - CANCEL Bookings Details
router
  .route('/:userId/account/booking/:bookingId/cancel')
  .delete(isLoggedIn, cancelBooking);


// User Account Edit Details Route
router
     .route('/:id/account/edit')
     .put(  isLoggedIn,upload.single('image'),validate(userSchemaValidation)  ,userAccountEditDetails)


// User Account Delete Route
router
     .route('/:id/account/delete')
     .delete( isLoggedIn,userAccountDelete)


export default router;