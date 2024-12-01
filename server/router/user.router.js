import express from 'express';
import { upload } from '../multer.js';
import { createNewUser } from '../controller/user.controller.js';

const router = express.Router();

// Register a New user Route
router
     .route('/register')
     .post(upload.single('image'), createNewUser);



export default router;