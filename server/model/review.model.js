import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reviewSchema = new Schema ({
    name:{
        type:String,
        trim:true,
        required:[true,"Name is required !"]
    },
    rating:{
        type:Number,
        required:true,
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating cannot exceed 5"],
    },
    comment:{
        type:String,
        trim:true,
        maxlength:[200,"Can't exceed 200 characters"]
    }
} ,
 {
    timestamps: true
})

const Review = mongoose.model('Review', reviewSchema);
export default Review;