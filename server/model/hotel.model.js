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
    }
]
},
{
    timestamps:true
});

hotelSchema.pre("remove", async function (next) {
    await this.model("Review").deleteMany({ hotel: this._id });
    next();
});

const Hotel = mongoose.model('Hotel' , hotelSchema);

export default Hotel;