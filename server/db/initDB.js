import dotenv from 'dotenv';
dotenv.config({
    path:"../.env"
})
import mongoose from "mongoose";
import sampleData from "./sampleData.js";
import Hotel from '../model/hotel.model.js';
import { User } from '../model/user.model.js';

// Database configuration
main()
.then(() =>{
    console.log("DB Success !");
})
.catch((err) =>{
    console.error("DB Error !" , err);
})

async function main(){
    await mongoose.connect(process.env.MONGODB_URI);
}

// Storing sample dataset in database
const initDB = async() => {
    await Hotel.deleteMany({});
    await User.deleteMany({});
    await Hotel.insertMany(sampleData);
    console.log("Data saved successfully !");
}

initDB();