import express from 'express';
import { isLoggedIn } from '../middleware/authentication.js';
import { validate } from '../middleware/validator.js';
import { createBlog, showAllBlogs } from '../controller/blogs.controller.js';
import { upload } from '../multer.js';
import { isLoggedIn } from '../middleware/authentication.js';
import { validate } from '../middleware/validator.js';
import { blogSchemaValidation } from '../test/blog.validator.js';

const router =  express.Router();
// Contact Information  Route
router
    .route('/contact')
    .get()

// Show all the Blogs
    router
         .route('/blogs')
         .get(showAllBlogs)

// Create a new Blog Route
router
    .route('/add-blog')
    .post(isLoggedIn , upload('image') ,validate(blogSchemaValidation) , createBlog)

//Show a particular Blog
router
     .route('/blog/:id')
     .get()

// Edit a particular Blog
router
     .route('/blog/:id/edit')
     .put()

// Delete a particular Blog
router
     .route('/blog/:id/delete')
     .delete()


     export default router ;