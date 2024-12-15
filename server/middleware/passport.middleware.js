import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
import passport from 'passport';
import localStrategy from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import {User} from '../model/user.model.js';


// Configure Local Strategy
passport.use(new localStrategy(User.authenticate()));

// Configure Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:8000/api/v1/user/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            username: profile.displayName.toLowerCase().replace(/\s+/g, ''), // Generate a default username
            name: profile.displayName, // Use Google name if available
            phone: null, // Leave phone null for Google users
          });
          await user.save();
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// Serialize and Deserialize Users
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
