import express from 'express';
import { createBlog, deleteBlog, editBlog, showAllBlogs, showBlogDetails } from '../controller/blog.controller.js';
import { upload } from '../multer.js';
import { isLoggedIn } from '../middleware/authentication.js';
import { validate } from '../middleware/validator.js';
import { blogSchemaValidation } from '../test/blog.validator.js';
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

// Create a new Blog Route
router
    .route('/add-blog')
    .post(isLoggedIn , upload.single('image') ,validate(blogSchemaValidation) , createBlog)


//Show a particular Blog Route
router
     .route('/blog/:id')
     .get(showBlogDetails)


// Edit a particular Blog Route
router
     .route('/blog/:id/edit')
     .put(isLoggedIn , upload.single('image') , validate(blogSchemaValidation) , editBlog)


// Delete a particular Blog Route
router
     .route('/blog/:id/delete')
     .delete(isLoggedIn , deleteBlog)


     export default router ;