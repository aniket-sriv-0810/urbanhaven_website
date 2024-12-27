import mongoose from "mongoose" ;
const Schema = mongoose.Schema ;

const contactSchema = new Schema(
    {
        user:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:[true,"User details are required !"],
        },
        message:{
            type:String,
            trim:true,
            required:[true,"Message is required !"],
            maxlength: [500, "Message cannot exceed 500 characters!"], // Example max length
        },
        status: {
            type: String,
            enum: ["Pending", "Resolved"],
            default: "Pending",
        },
    },
     {
        timestamps: true
    });

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;