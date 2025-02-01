import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name :{
        type:String,
        trim:true,
        required:[ true,"Name is required !" ],
    },
    username:{
        type:String,
        trim:true,
        unique:[true, "Username already exists !"],
        required:[true , "Username is required !"  ],
    },
    phone :{
        type:String,
        unique:[true, "Phone number already exits !"],
        required:[true , "Phone is required !"],
        validate: {
            validator: function (v) {
                return /^[0-9]{10}$/.test(v); // Validate for a 10-digit phone number otherwise
            },
            message: "Phone number must be a 10-digit number.",
    },
},
    email:{
        type:String,
        trim:true,
        unique:[true, "Email ID already exits !"],
        required:[true, "Email is required !"],
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
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref :"Review",
        }
    ],
    wishlists :[
        {
            type: Schema.Types.ObjectId,
            ref: "Hotel"
        },
    ],
    bookings :[
        {
            type: Schema.Types.ObjectId,
            ref:"Booking"
        }
    ],
    feedbacks :[
        {
            type: Schema.Types.ObjectId,
            ref: "Contact",
        }
    ]
} ,
 {
    timestamps: true
});

userSchema.index({ phone: 1 }, { unique: true });

userSchema.pre("save", function (next) {
    this.email = this.email.toLowerCase();
    this.username = this.username.toLowerCase();
    next();
});

userSchema.pre("save", async function (next) {
    if (this.isModified("email")) {
        this.email = this.email.toLowerCase();
    }
    if (this.isModified("username")) {
        this.username = this.username.toLowerCase();
    }
    next();
});
userSchema.pre("findOneAndDelete", async function (next) {
    const user = await this.model.findOne(this.getFilter());
    if (!user) return next();
    
    await mongoose.model("Review").deleteMany({ _id: { $in: user.reviews } });
    await mongoose.model("Hotel").updateMany({ _id: { $in: user.wishlists } }, { $pull: { wishlists: user._id } });
    await mongoose.model("Booking").deleteMany({ _id: { $in: user.bookings } });
    await mongoose.model("Contact").deleteMany({ _id: { $in: user.feedbacks } });

    next();
});


userSchema.plugin(passportLocalMongoose);




const User = mongoose.model( 'User' , userSchema);
// db.users.updateMany({}, { $unset: { password: "" } });
// db.users.dropIndex('password_1'); // Replace 'password_1' with the actual index name
// db.users.getIndexes();

console.log("New Schema Exported !");

export {User};