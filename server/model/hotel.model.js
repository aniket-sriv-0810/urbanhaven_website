import mongoose from "mongoose";
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    title:{
        type:String,
        unique :[true, "Title must be unique !"],
        trim:true,
        required:[true, "Title is required !"],
    },
    description:{
        type:String,
        trim:true,
        required:[true, "Description is required"],
    },
    price:{
        type:Number,
        min:[0, "Price must be positive !"],
        required:[true, "Price is required"],
    },
    image:{
        type:String, //cloudinary url
        required:[true,"Image is required !"]
    },
    city:{
        type:String,
        trim:true,
        required:[true , "City is required !"],
    },
    state:{
        type:String,
        trim:true,
        required:[true , "State is required !"],
    },
    country:{
        type:String,
        trim:true,
        required:[true , "Country is required !"],
    },
    review:[
    {
        type:Schema.Types.ObjectId,
        ref:"Review"
    },
],


},
{
    timestamps:true
});

// Index for GeoJSON location for geospatial queries
hotelSchema.index({ location: "2dsphere" });

// Middleware to delete associated reviews
hotelSchema.pre("findOneAndDelete", async function (next) {
    try {
        const hotel = await this.model.findOne(this.getFilter()).populate("review");
        if (hotel && hotel.review.length > 0) {
          const reviewIds = hotel.review.map((r) => r._id);
          await mongoose.model("Review").deleteMany({ _id: { $in: reviewIds } });
        }
        next();
    } catch (error) {
        next(error);
    }
  });

const Hotel = mongoose.model('Hotel' , hotelSchema);

export default Hotel;