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
        default: "https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI=",
        required:[true,"Image is required !"]
    },
    city:{
        type:String,
        trim:true,
        required:[true , "City is required !"],
    },
    pincode:{
        type:Number,
        min:[6," Enter Valid Pincode"],
        required:[true,"Pincode is required !"],
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
    location: {
        type: {
            type: String,
            enum: ["Point"], // GeoJSON format
            required: [true, "Location Point is required !"],
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
        validate: {
            validator: function (v) {
                return v.length === 2; // Ensure exactly two elements
            },
            message: "Coordinates must contain longitude and latitude!",
        },
        required: [true, "Location Coordinates are required!"],
        },
    },
    review:[
    {
        type:Schema.Types.ObjectId,
        ref:"Review"
    },
],
    userOwner:[
    {
        type: Schema.Types.ObjectId,
        ref:"User",
        required: [true,"Owner details are required !"]
    }
]
},
{
    timestamps:true
});

// Index for GeoJSON location for geospatial queries
hotelSchema.index({ location: "2dsphere" });

// Middleware to delete associated reviews
hotelSchema.pre("findOneAndDelete", async function (next) {
    const hotel = await this.model.findOne(this.getFilter()).populate("review");
    if (hotel && hotel.review.length > 0) {
      const reviewIds = hotel.review.map((r) => r._id);
      await mongoose.model("Review").deleteMany({ _id: { $in: reviewIds } });
    }
    next();
  });

const Hotel = mongoose.model('Hotel' , hotelSchema);

export default Hotel;