import mongoose from "mongoose";
const Schema =  mongoose.Schema;

const ownerSchema = new Schema(
    {
        ownerName :{
            type:String,
            required:[true , "Name is required !"]
        },
        ownerPhone :{
            type:Number,
            required:[true , "Phone is required !"]
        },
        ownerEmail :{
            type:String,
            required:[true , "Email is required !"]
        },
        ownerImage:{
            type:String,
            required: [true, "image is required !"]
        },
        ownerCity:{
            type:String,
            required: [true, "city is required !"]
        },
        ownerState:{
            type:String,
            required: [true, "state is required !"]
        },
        ownerCountry:{
            type:String,
            required: [true, "country is required !"]
        },
        ownerDescription :{
            type:String,
            required: [true, "description is required !"]
        }
} ,
    {
    timestamps: true,
});

const Owner = mongoose.model( 'Owner' , ownerSchema);

export default Owner;