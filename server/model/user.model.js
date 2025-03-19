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
        default:"https://media-hosting.imagekit.io//8450b6563e51411a/person.jpg?Expires=1837021220&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=d5ybsGf9x9CF2tndNXZPaEE2D7Jv6oM0woujqPnvZEo1tRIolVKCBmBJKz0Ze5Iaf7HFEIz-193BtXERHHp28s6Rooexh2-ttsIhsp5b1z-90TqIBieJGtrs-aNNawTGDM5KKL48F3jh5UBYb0CW~7WP6OOLyGUnXScY3fW4vBUeSK8ygoDc4KP~BIzOSAPuNor-x-G9a71thKwFOjpYnE-Q9hMcW8W-tEGAWA8gWB1IK613rfrs6yWDL192ayv-~2EOr6P9em7ds5NmF1SGaLU6Zeb3RW5rlp17CyT37ift7mbALGLYxkRCGh~JKUxO7jibxhPojdjudtKOAp53Pg__",
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