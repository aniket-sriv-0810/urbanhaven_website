import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name :{
        type:String,
        trim:true,
        required:true
    },
    username:{
        type:String,
        trim:true,
        required:true,
        unique:true,
    },
    phone :{
        type:Number,
        unique:true,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        required:true,
    },
    image:{
        type:String,
        default:"https://e7.pngegg.com/pngimages/81/570/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png",
        set:(v) => v ? v : "https://e7.pngegg.com/pngimages/81/570/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png"
    },
} ,
 {
    timestamps: true
});

userSchema.plugin(passportLocalMongoose);


const User = mongoose.model( 'User' , userSchema);
// db.users.updateMany({}, { $unset: { password: "" } });
// db.users.dropIndex('password_1'); // Replace 'password_1' with the actual index name
// db.users.getIndexes();

console.log("New Schema Exported !");

export {User};