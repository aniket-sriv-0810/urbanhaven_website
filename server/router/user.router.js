import express from 'express';
import {validate} from '../middleware/validator.js';
import {checkLogInUser} from '../middleware/auth.middleware.js';
import {  upload } from '../multer.js';
import { createNewUser, loginUser , logOutUser , checkAuthentication, userAccountDetails , userAccountEditDetails , userAccountDelete} from '../controller/user.controller.js';
import {userSchemaValidation} from '../test/user.validator.js'
import passport from 'passport';
import { ApiResponse } from '../utils/ApiResponse.js';
import { allHotel } from '../controller/hotel.controller.js';
import { loginUserValidation } from '../test/login.validator.js';
import { isLoggedIn } from '../middleware/authentication.js';
const router = express.Router();

// Register a New user Route
router
     .route('/register')
     .post( validate(userSchemaValidation) , createNewUser);

// Login of the registered user
router
     .route('/login')
     .post( validate(loginUserValidation) ,loginUser);

// Logout of the registered user
router
     .route('/logout')
     .post(logOutUser);

// Check for the user authentication
router
     .route('/auth')
     .get(checkAuthentication)

// User Account Details
router
     .route('/:id/account')
     .get( isLoggedIn,userAccountDetails)

// User Account Edit Details
router
     .route('/:id/account/edit')
     .put(  isLoggedIn,upload.single('image'),validate(userSchemaValidation)  ,userAccountEditDetails)

// User Account Edit Details
router
     .route('/:id/account/delete')
     .delete( isLoggedIn,userAccountDelete)

export default router;