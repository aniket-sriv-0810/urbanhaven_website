import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reviewSchema = new Schema ({
    name:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    review:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        unique:true
    }
} ,
 {
    timestamps: true
})

const Review = mongoose.model('Review', reviewSchema);
export default Review;