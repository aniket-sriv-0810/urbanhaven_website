import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import localStrategy from 'passport-local';
import { User } from './model/user.model.js';



const app = express();


// middleware setup
const corsSessionOption = {
    origin:"http://localhost:5173",
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
        secure : false
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

passport.use(new localStrategy(User.authenticate()));
// Serialize only the user ID into the session
passport.serializeUser((user, done) => {
    done(null, user._id); // Store only the user ID in the session
  });
  
  // Deserialize the user ID into the full user object
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).select("_id name email username");
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
  

// Routes
import hotelRouter from './router/hotel.router.js';
import userRouter from './router/user.router.js';
import adminRouter from './router/admin.router.js';
// For hotel Routes
app.use('/' , hotelRouter);
app.use('/api/v1/user' , userRouter);
app.use('/api/v1/admin', adminRouter);




export {app};