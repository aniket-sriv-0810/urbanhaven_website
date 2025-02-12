import Blog from '../model/blog.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import mongoose from 'mongoose';


// Show all the blogs Controller Code
const showAllBlogs = asyncHandler( async (req ,res) => {
  try {
      const allBlogs = await Blog.find({});

      // If no Blogs are found !
      if(allBlogs.length <= 0)
        return res.status(200).json(
        new ApiResponse(200 ,"No blog found !")
      )

      console.log("All Blogs fetched successfully...");

      return res.status(200).json(
        new ApiResponse (200 , {allBlogs} , "Blogs data fetched successfully !")
      );
  } 
  catch (error) {
    return res.status(400).json(
      new ApiError(400 , error , "Error fetching blogs...")
    )
  }
});

// Create a new Blog Controller code
const createBlog = asyncHandler( async (req , res) => {
 try {
       const {title , description  } = req.body ;

       // Check if image is given or not
     if(!req.file){
      return res.status(404).json({
          status: 404,
          message: "Validation Error",
          details: ["Image file is not found !"],
        })
     }
    //  Checking for uniqueness of the title
     const existingTitle = await Blog.findOne({ title });
     if(existingTitle){
      return res.status(400).json({
        status: 400,
        message: "Validation Error",
        details: ["Blog Title already exists"],
      })
    }

    //  Storing the image
     const imagePath = req.file.path ;
     const image = await uploadOnCloudinary(imagePath);

    //  Storing the Blog in DB
     const newBlog = new Blog ({ title , description , image : image.url}) ;
     await newBlog.save();

     console.log("New Blog saved !");

     return res.status(200).json(
       new ApiResponse(200 , {newBlog} , "Blog created successfully !")
     )
 }
 catch (error) {
  return res.status(400).json(
     new ApiError (400 , error , "Error creating a new Blog" )
  )
 }

})

// Show a particular blog controller code
const showBlogDetails = asyncHandler ( async ( req , res) => {
   try {
     const {id} = req.params ;

// Check if Blog ID is not found or if it is Valid
          if(!id){
            return res.status(400).json(
               new ApiError(400 ,"Blog ID is required!")
            )
         }
         if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json(
             new ApiError(400, "Invalid ID", "Invalid ID ! Failed to Show the Blog!")
          )
         }

//  Find the particular Blog
         const blogDetails = await Blog.findById(id);

         if(!blogDetails){
          return res.status(404).json({
            status: 404,
            message: "Validation Error",
            details: ["Blog does not exist !"],
          })
         }

         return res.json(
             new ApiResponse(200 , {blogDetails} , "Blog details fetched successfully !")
         )
   } catch (error) {
    return res.status(400).json(
       new ApiError(400 , error , "FAILED to fetch Blog details !")
    )
   }
});

// Editing a particular blog controller code
const editBlog = asyncHandler ( async ( req , res) => {
    try {
        const {id} = req.params ;
        if(!id){
          return res.status(400).json(
            new ApiError(400 ,"Blog ID is required!")
         )
       }
       if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json(
          new ApiError(400, "Invalid ID", "Invalid ID ! Failed to Show the Blog!")
       )
       }
       const { title , description} = req.body;
        //  Checking for uniqueness of the title
     const existingTitle = await Blog.findOne({ title });

       console.log("Req.file =>" , req.file);
       // Check if image is given or not
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
          return res.status(404).json({
            status: 404,
            message: "Validation Error",
            details: ["Updated Blog  does not found !"],
          })
          }
          console.log("DATA updated successfully !");
         return  res.status(200).json(
            new ApiResponse(200 , {updatedBlog} , "Blog updated successfully !")
         )
    }
    catch (error) {
        return res.status(400).json(
          new ApiError(400 , error , "Failed to Update the Blog !")
        )
    }

});

// Delete a particular blog controller code
const deleteBlog = asyncHandler ( async ( req , res) => {
  try {
    const {id} = req.params ;
    if(!id){
      return res.status(400).json(
        new ApiError(400 ,"Blog ID is required!")
     )
   }
   if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json(
      new ApiError(400, "Invalid ID", "Invalid ID ! Failed to Show the Blog!")
   )
   }
  const deletedBlog =  await Blog.findByIdAndDelete(id);
  if(!deletedBlog){
    return res.status(404).json(
      new ApiError(404, "Blog does not exist !")
   )
  }
  console.log("Blog deleted successfully !");

  return res.status(200).json(
    new ApiResponse(200 , "Blog deleted successfully !")
  )
  }
  catch (error) {
    return  res.status(400).json(
      new ApiError(400 , error , "FAILED to Delete the Blog!")
    )
  }

})


export {showAllBlogs , createBlog , showBlogDetails , editBlog, deleteBlog}