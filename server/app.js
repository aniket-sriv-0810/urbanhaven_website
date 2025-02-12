import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from './middleware/passport.middleware.js';

const app = express();

// middleware setup
const corsSessionOption = {
    origin:process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials:true,
    optionsSuccessStatus:200,
};

const expressSessionOption = {
    secret:process.env.EXPRESS_SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly: true,
        maxAge :24*60*60*1000 ,// 1 day expiry time,
        secure : false,
        samSite:'none',
    }
};

app.use(cors(corsSessionOption));
app.use(session(expressSessionOption));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());



// Routes
import hotelRouter from './router/hotel.router.js';
import userRouter from './router/user.router.js';
import adminRouter from './router/admin.router.js';
import navigateRouter from './router/navigation.router.js';
// For hotel Routes
app.use('/' , hotelRouter);
app.use('/v1/user' , userRouter);
app.use('/v1/admin', adminRouter);

//Router for - Blogs , Faqs and Contact
app.use('/v1/navigate' , navigateRouter);




export {app};