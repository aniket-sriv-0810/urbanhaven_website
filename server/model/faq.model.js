import mongoose from "mongoose";
const Schema  = mongoose.Schema; 

const faqSchema = new Schema (
    {
        title : {
            type:String,
            required: true,
        },
        solution:{
            type:String,
            required: true,
        },
    } ,
    { timestamps : true});

const Faq = new mongoose.model ("Faq", faqSchema);

export default Faq ;