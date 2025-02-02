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

export {showAllBlogs}