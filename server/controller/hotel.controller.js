
import Hotel from '../model/hotel.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
// Home Page Logic - Display all the hotels
const allHotel = async(req,res) =>{
    const allHotel = await Hotel.find({});
    return res.status(200).json({allHotel});
}

// Register a new Hotel Logic
const newHotelCreation = async(req ,res) =>{
    const {title , description , price , city , state , country } = req.body;
    const imagePath = req.file.path ;
    const image = await uploadOnCloudinary(imagePath);
    const newHotel = new Hotel({
        title , description , price , city , state , country , image:image.url ||  "https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI="
    })
    await newHotel.save();
    console.log("new hotel saved !");
    return res.status(200).json({msg:"ok"});
}

// Contact Form logic
const contactLogic = (req,res) =>{
    return res.status(200).json({msg :"Contact Form from the Backend Server !"});
}

export { allHotel , newHotelCreation , contactLogic} ;