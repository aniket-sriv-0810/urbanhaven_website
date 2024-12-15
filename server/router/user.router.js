import express from 'express';
import {validate} from '../middleware/validator.js';
import {checkLogInUser} from '../middleware/auth.middleware.js';
import { upload } from '../multer.js';
import { createNewUser, loginUser , logOutUser , checkAuthentication, userAccountDetails , userAccountEditDetails , userAccountDelete} from '../controller/user.controller.js';
import {userSchemaValidation} from '../test/user.validator.js'
import passport from 'passport';
import { ApiResponse } from '../utils/ApiResponse.js';
import { allHotel } from '../controller/hotel.controller.js';
const router = express.Router();

// Register a New user Route
router
     .route('/register')
     .post(upload.single('image'), validate(userSchemaValidation),createNewUser);

// Login a the registered user
router
     .route('/login')
     .post(checkLogInUser,loginUser);

// Logout a the registered user
router
     .route('/logout')
     .post(logOutUser);

// Check for the user authentication
router
     .route('/auth')
     .get(checkAuthentication)

// Google Authentication Route
router
     .route('/auth/google')
     .get(passport.authenticate('google',{scope :['profile' ,'email']}));

// Google Callback Route

router
     .route('/auth/google/callback')
     .get(passport.authenticate('google', { failureRedirect: '/login' }),
     (req, res) => {
          const user = req.user; // Google user info populated by passport
     // If the user is authenticated, handle them here
            // Optionally, you can store the user in session or perform any actions
            
            // Redirect to the frontend after login
            return res.redirect(`http://localhost:5173/?user=${encodeURIComponent(JSON.stringify(user))}`);
     })
// User Account Details
router
     .route('/:id/account')
     .get(userAccountDetails)

// User Account Edit Details
router
     .route('/:id/account/edit')
     .put(  upload.single('image') ,userAccountEditDetails)

// User Account Edit Details
router
     .route('/:id/account/delete')
     .delete(userAccountDelete)

export default router;