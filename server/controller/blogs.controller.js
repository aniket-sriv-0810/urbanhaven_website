import Blog from '../model/blog.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';


// Show all the blogs
const showAllBlogs = asyncHandler( async (req ,res) => {
  try {
      const allBlogs = await Blog.find({});
      if(!allBlogs)
        throw new ApiError(400 , "No blog found !");

      console.log("All Blogs fetched successfully...");
      return res.json(
        new ApiResponse (200 , {allBlogs} , "Blogs data fetched successfully !")
      );
  } catch (error) {
    throw new ApiError(400 , error , "Error fetching blogs...");
  }
});

// Create a new blog
const createBlog = asyncHandler( async (req , res) => {
 try {
       const {title , description  } = req.body ;
          // Validate files existence
     if(!req.file){
       throw new ApiError(400 , "Image file not found !");
     }
     const imagePath = req.file.path ;
     const image = await uploadOnCloudinary(imagePath);
   
     const newBlog = new Blog ({ title , description , image : image.url}) ;
   
     await newBlog.save();
     console.log("New Blog saved !");
     return res.json( 
       new ApiResponse(200 , {newBlog} , "Blog created successfully !")
     )
 } catch (error) {
    throw new ApiError (400 , error , "Error creating a new Blog" )
 }

})

export {showAllBlogs , createBlog}