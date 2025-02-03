import Blog from '../model/blog.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

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

// Show a particular blog
const showBlogDetails = asyncHandler ( async ( req , res) => {
   try {
     const {id} = req.params ;
 
          if(!id){
              throw new ApiError(400 ,"Blog ID is required!");
         }
         if (!mongoose.Types.ObjectId.isValid(id)) {
           throw new ApiError(400, "Invalid ID", "Failed to Show the Blog!");
         }
 
         const blogDetails = await Blog.findById(id);
         console.log("Blog details fetched ...");
 
         return res.json(
             new ApiResponse(200 , {blogDetails} , "Blog details fetched successfully !")
         )
   } catch (error) {
    throw new ApiError(400 , error , "FAILED to fetch Blog details !")
   }
});

// Edit a particular blog
const editBlog = asyncHandler ( async ( req , res) => {
    try {
        const {id} = req.params ;
        if(!id){
            throw new ApiError(400 ,"Blog ID is required!");
       }
       if (!mongoose.Types.ObjectId.isValid(id)) {
         throw new ApiError(400, "Invalid ID", "Failed to Show the Blog!");
       }
       const { title , description} = req.body;
       console.log("Req.file =>" , req.file);
      let cloudinaryResult = null;
    
      if (req.file) {
        // Upload the file to Cloudinary
        cloudinaryResult = await uploadOnCloudinary(req.file.path);
      }
      const updatedData = { title , description};
        // Update image field if a new image is uploaded
        if (cloudinaryResult && cloudinaryResult.url) {
            updatedData.image = cloudinaryResult.url;
          }
          const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
          });
          if(!updatedData){
            throw new ApiError(400,"Couldn't find updated hotel !" , "Something went wrong")
          }
          console.log("DATA updated successfully !");
         return  res.json(
            new ApiResponse(200 , {updatedBlog} , "Blog updated successfully !")
         )
    } catch (error) {
        throw new ApiError(400 , error , "FAILED to update Blog !")
    }

});

// Delete a particular blog
const deleteBlog = asyncHandler ( async ( req , res) => {
  try {
    const {id} = req.params ;
    if(!id){
      throw new ApiError(400 ,"Blog ID is required!");
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
   throw new ApiError(400, "Invalid ID", "Failed to Delete the Blog!");
  }
  await Blog.findByIdAndDelete(id);
  console.log("Blog deleted successfully !");
  
  return res.json(
    new ApiResponse(200 , "Blog deleted successfully !")
  )
  } catch (error) {
    throw new ApiError(400 , error , "FAILED to Delete the Blog!");
  }

})


export {showAllBlogs , createBlog , showBlogDetails , editBlog}