import express from 'express';
import { createReview } from '../controller/review.controller.js';
const router = express.Router();

// Create a new Review
router
     .route('/:id/review')
     .post(createReview)


export default router;
