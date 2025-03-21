import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
import passport from 'passport';
import localStrategy from 'passport-local';
import {User} from '../model/user.model.js';


// Configure Local Strategy
passport.use(new localStrategy(User.authenticate()));

// Serialize and Deserialize Users
passport.serializeUser((user, done) => done(null, user._id));  // ✅ Use _id

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    console.log("Deserializing user:", user);  // ✅ Debugging log
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});


export default passport;
