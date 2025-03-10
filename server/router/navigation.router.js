import express from 'express';
import { showAllBlogs, showBlogDetails } from '../controller/blog.controller.js';
import { isLoggedIn } from '../middleware/authentication.js';
import { validate } from '../middleware/validator.js';
import { contactLogic, faqData } from '../controller/pages.controller.js';
import { contactSchemaValidation } from '../test/contact.validator.js';

const router =  express.Router();

// CORE Route - /v1/navigate


// Contact & Feedbacks Route
router
    .route('/contact')
    .post(isLoggedIn ,validate(contactSchemaValidation) , contactLogic)


//FAQs Rendering Route
router
    .route('/faqs')
    .get(faqData)


// All Blogs Routes
    router
         .route('/all-blogs')
         .get(showAllBlogs)



//Show a particular Blog Route
router
     .route('/blog/:id')
     .get(showBlogDetails)




     export default router ;