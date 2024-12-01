import express from 'express';
import { upload } from '../multer.js';
import { allHotel ,  contactLogic,  newHotelCreation , showMyHotel , editMyHotel , deleteMyHotel} from '../controller/hotel.controller.js';
const router =  express.Router();

// Home Route Page
router
    .route('/')
    .get(allHotel)

// Register a New Hotel Route
router
    .route('/api/v1/new')
    .post( upload.single('image') , newHotelCreation )

// Contact Information  Route
router
    .route('/api/v1/contact')
    .get(contactLogic)

// Show a Particular Hotel Route
router
     .route('/api/v1/hotel/:id')
     .get(showMyHotel)

// Edit a Particular Hotel Route
router
     .route('/api/v1/hotel/:id/edit')
     .put(upload.single('image'),editMyHotel)

// Delete a Particular Hotel Route
router
     .route('/api/v1/hotel/:id/delete')
     .delete(deleteMyHotel)







export default router ;