import mongoose from "mongoose";
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    title:{
        type:String,
        unique:true,
        trim:true,
        required:true,
    },
    description:{
        type:String,
        trim:true,
        required:true,
    },
    price:{
        type:Number,
        min:0,
        required:true,
    },
    image:{
        type:String, //cloudinary url
        default: "https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI=",
        set: (v) => v ? v : "https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI=",
    },
    city:{
        type:String,
        trim:true,
        required:true,
    },
    state:{
        type:String,
        trim:true,
        required:true,
    },
    country:{
        type:String,
        trim:true,
        required:true,
    },
    review:{
        type:Schema.Types.ObjectId,
        ref:"Review"
    }
},
{
    timestamps:true
});

const Hotel = mongoose.model('Hotel' , hotelSchema);

export default Hotel;