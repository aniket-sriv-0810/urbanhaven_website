import { User } from '../model/user.model.js';
import mongoose from 'mongoose';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import passport from 'passport';


//Register a new User Logic
const createNewUser = async(req , res) => {
    const {name , username , phone , email , password} = req.body;
console.log("req.file =>" + req.file);
const imageUrl = req.file ? await uploadOnCloudinary(req.file.path) : null;
    const newUser = new User ({ name , username , phone , email , image:imageUrl ? imageUrl.url : "https://e7.pngegg.com/pngimages/81/570/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png"});
    const registerNewUser = await User.register(newUser , password)


    console.log("User Registered Successfully");
    return res.status(200).json({registerNewUser});

}

// Login the Registered User
const loginUser = async (req ,res) => {
    passport.authenticate("local",{
        failureRedirect: '/login',
        failureFlash: true
    })
    console.log("User logged in !");
    return res.status(200).json({loginUser});
}

const logOutUser = async (req , res) => {
    req.logout((err) => {
        if(err)
            next(err);
       return res.status(200).json({msg:"User logged out successfully !"});
    })
}

export {createNewUser , loginUser , logOutUser};