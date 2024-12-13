import express from 'express';
import {validate} from '../middleware/validator.js';
import {checkLogInUser} from '../middleware/auth.middleware.js';
import { upload } from '../multer.js';
import { createNewUser, loginUser , logOutUser , checkAuthentication, userAccountDetails} from '../controller/user.controller.js';
import {userSchemaValidation} from '../test/user.validator.js'

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

router
     .route('/:id/account')
     .get(userAccountDetails)
export default router;