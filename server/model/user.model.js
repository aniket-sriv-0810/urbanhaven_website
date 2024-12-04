import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name :{
        type:String,
        trim:true,
        required:[true,"Name is required"],
    },
    username:{
        type:String,
        trim:true,
        required:[true, "Username is required"],
        unique:[true, "Username is must be unique !"],
    },
    phone :{
        type:Number,
        unique:[true, "Phone is must be unique !"],
        required:[true, "Phone is required"],
        validate: {
            validator: function (v) {
                return /^[0-9]{10}$/.test(v); // Validate for a 10-digit phone number
            },
            message: "Phone number must be 10 digits",
        },
    },
    email:{
        type:String,
        trim:true,
        unique:[true, "Email is must be unique !"],
        required:[true, "Email is required"],
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Simple email validation
            },
            message: "Invalid email format",
        },
    },
    image:{
        type:String,
        default:"https://e7.pngegg.com/pngimages/81/570/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png",
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
} ,
 {
    timestamps: true
});

userSchema.pre("save", function (next) {
    this.email = this.email.toLowerCase();
    this.username = this.username.toLowerCase();
    next();
});

userSchema.plugin(passportLocalMongoose);



const User = mongoose.model( 'User' , userSchema);
// db.users.updateMany({}, { $unset: { password: "" } });
// db.users.dropIndex('password_1'); // Replace 'password_1' with the actual index name
// db.users.getIndexes();

console.log("New Schema Exported !");

export {User};