import mongoose from "mongoose";
const Schema = mongoose.Schema ;

const blogSchema = new Schema (
    {
        title : {
            type:String,
            required: [true, "Blog Title is required !"],
            unique: [true, "Blog Title already exist !"],
        },
        description : {
            type:String ,
            required: [true, "Description is required !"],
        },
        image:{
            type:String,
            required: [true, "Image is required !"]
        }

    } ,
    {timestamps : true})

    const Blog = mongoose.model ("Blog" , blogSchema);

    export default Blog;