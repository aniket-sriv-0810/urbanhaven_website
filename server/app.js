import express from 'express';
import cors from 'cors';
import { upload } from './multer.js';
import { uploadOnCloudinary } from './utils/cloudinary.js';
import Hotel from './model/hotel.model.js';
const app = express();


// middleware setup

app.use(cors({
    origin:"http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials:true,
    optionsSuccessStatus:200,
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));



// Routes
app.get('/' , async(req,res) =>{
    const allHotel = await Hotel.find({});
    return res.status(200).json({allHotel});
})
// display all the hotels
app.get('/api/v1/contact'  , (req,res) =>{
    return res.status(200).json({msg :"Contact Form from the Backend Server !"});
})

// create a new hotel
app.post('/api/v1/new' , upload.single('image'), async(req ,res) =>{
    const {title , description , price , city , state , country } = req.body;
    const imagePath = req.file.path ;
    const image = await uploadOnCloudinary(imagePath);
    const newHotel = new Hotel({
        title , description , price , city , state , country , image:image.url ||  "https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI="
    })
    await newHotel.save();
    console.log("new hotel saved !");
    return res.status(200).json({msg:"ok"});
})

export {app};