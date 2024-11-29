import express from 'express';
import cors from 'cors';
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
app.get('/' , (req,res) =>{
    return res.status(200).json({msg:"server working..."})
})
app.get('/api/v1/contact'  , (req,res) =>{
    return res.status(200).json({msg :"Contact Form from the Backend Server !"});
})

export {app};