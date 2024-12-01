
import { response } from 'express';
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

// Show  a particular hotel
const showMyHotel = async(req , res ) => {
    let {id} = req.params;
    if(!id)
        console.log("Invalid Hotel !");
    const showHotel = await Hotel.findById(id);
    console.log("My Hotel => " ,showHotel);
    return res.status(200).json({showHotel});
};

// Edit a particular hotel
const editMyHotel =  (async (req , res) => {
    let {id} = req.params;
    const {title , description , price , city , state , country} = req.body;

console.log("Req.file =>" , req.file);
let cloudinaryResult = null;

if (req.file) {
  // Upload the file to Cloudinary
  cloudinaryResult = await uploadOnCloudinary(req.file.path);
}

const updatedData = {
  title,
  description,
  price,
  city,
  state,
  country,
};

// Update image field if a new image is uploaded
if (cloudinaryResult && cloudinaryResult.url) {
  updatedData.image = cloudinaryResult.url;
}

const updatedHotel = await Hotel.findByIdAndUpdate(id, updatedData, {
  new: true,
  runValidators: true,
});

res.status(200).json({ updatedHotel });
})

// Delete a Particular Hotel
const deleteMyHotel = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Hotel ID to delete:", id); // Debugging
    const deletedHotel = await Hotel.findByIdAndDelete(id);
    if (!deletedHotel) {
      return res.status(404).json({ msg: "Hotel not found" });
    }
    return res.status(200).json({ msg: "Deleted Successfully" });
  } catch (error) {
    console.error("Error deleting hotel:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};


// Contact Form logic
const contactLogic = (req,res) =>{
    return res.status(200).json({msg :"Contact Form from the Backend Server !"});
}

export { allHotel , newHotelCreation , contactLogic , showMyHotel , editMyHotel , deleteMyHotel } ;