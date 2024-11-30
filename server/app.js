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
import hotelRouter from './router/hotel.router.js';

app.use('/' , hotelRouter);




export {app};