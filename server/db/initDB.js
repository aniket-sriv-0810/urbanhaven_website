import dotenv from 'dotenv';
dotenv.config({
    path:"../.env"
})
import mongoose from "mongoose";
import sampleData from "./sampleData.js";
import Hotel from '../model/hotel.model.js';

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

const initDB = async() => {
    await Hotel.deleteMany({});
    await Hotel.insertMany(sampleData);
    console.log("Data inserted successfully !");
}

initDB();