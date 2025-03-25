import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from './middleware/passport.middleware.js';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const isProduction = process.env.NODE_ENV === 'production';

// 🔥 Set trust proxy before session middleware
app.set("trust proxy", 1);  // Required for Render & secure cookies

// Middleware setup
const corsSessionOption = {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
};

const expressSessionOption = {
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
        mongoUrl: process.env.MONGODB_URI,  // Use your MongoDB connection URL
        collectionName: 'sessions', // Optional: Specify collection name
        autoRemove: 'disabled',
    }),
    cookie: {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day expiry time
        secure: isProduction, // Secure only in production
        sameSite: isProduction ? 'none' : 'lax',
    },
};

app.use(cors(corsSessionOption));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(expressSessionOption));
app.use(passport.initialize());
app.use(passport.session());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve React frontend for all unhandled routes
const clientBuildPath = path.join(__dirname, 'public');

app.use(express.static(clientBuildPath));


// Debugging Middleware
app.use((req, res, next) => {
    console.log("Cookies Received:", req.cookies);
    console.log("Session ID:", req.sessionID);
    console.log("Session Data:", req.session);
    next();
});

// Routes
import hotelRouter from './router/hotel.router.js';
import userRouter from './router/user.router.js';
import adminRouter from './router/admin.router.js';
import navigateRouter from './router/navigation.router.js';

// Router for - Hotels, Reviews, and Booking
app.use('/', hotelRouter);
app.use('/v1/user', userRouter);

// Router for - Admin details, adding new listings & blogs
app.use('/v1/admin', adminRouter);

// Router for - Blogs, FAQs, and Contact
app.use('/v1/navigate', navigateRouter);




// Serve React frontend for any unhandled route
app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
});
export { app };
