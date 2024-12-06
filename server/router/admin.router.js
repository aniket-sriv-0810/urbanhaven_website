import express from 'express';
const router = express.Router();

// admin dashboard Route
router
     .route('/dashboard')

// All Registered Users detailed  Route!
router
     .route('/users')

// All Contact Queries detailed Route !
router
     .route('/contacts')

// Register a new Hotel in the website Route
router
     .route('/new-hotel')

export default router;
