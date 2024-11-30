import express from 'express';
import { allHotel ,  contactLogic,  newHotelCreation } from '../controller/hotel.controller.js';
import { upload } from '../multer.js';
const router =  express.Router();

// Home Route Page
router
    .route('/')
    .get(allHotel)

router
     .route('/api/v1/new')
     .post( upload.single('image') , newHotelCreation )

router
     .route('/api/v1/contact')
     .get(contactLogic)
export default router ;