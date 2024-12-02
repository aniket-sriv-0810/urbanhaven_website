import express from 'express';
import { upload } from '../multer.js';
import { createNewUser, loginUser , logOutUser} from '../controller/user.controller.js';

const router = express.Router();

// Register a New user Route
router
     .route('/register')
     .post(upload.single('image'), createNewUser);

// Login a the registered user
router
     .route('/login')
     .post(loginUser);

// Logout a the registered user
router
     .route('/logout')
     .post(logOutUser);
export default router;