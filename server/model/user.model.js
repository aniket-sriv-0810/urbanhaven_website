import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required!"],
    },
    username: {
      type: String,
      trim: true,
      unique: true, // ✅ Passport-local-mongoose handles username uniqueness
      required: [true, "Username is required!"],
    },
    phone: {
      type: String,
      unique: true, // ✅ Removed duplicate index definition
      required: [true, "Phone is required!"],
      validate: {
        validator: function (v) {
          return /^[0-9]{10}$/.test(v);
        },
        message: "Phone number must be a 10-digit number.",
      },
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email is required!"],
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Invalid email format",
      },
    },
    image: {
      type: String,
      default:
        "https://media-hosting.imagekit.io//4bc72ff0889f4681/demo.png?Expires=1837020820&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=c3Nq6Mu7wtR7-l57wCuFJDWqnmAYe1mnhTV60rRh~Jbr8iEoriWR0qAXj7ZZTfT4XwDeVixlpLg0spaVCXXnT0PkgZgvPx8uAqEOl2brHCHXKkKbKmE3Szgkh6l~dfwmJhUcL1pLE0v23fLt6xcVnwglPQ~tZ1fmD02KYcjDD1cX8lTGmF2wSHJv0OVScK2Aw4mHuUSvWbBrDsRt7PpFfWskmXiWUG~QuWDgbcHuSrS2r2ffQ98PdMT96uhXeNRwZsmFs8BSzj15gVYC05hBdkk~7uKhWuA6rl5eSh61hqCLvkjElDrHe7wLa7tfJwUVYRcYicu6LTU0UIeNckAViw__",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    wishlists: [
      {
        type: Schema.Types.ObjectId,
        ref: "Hotel",
      },
    ],
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    feedbacks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Contact",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// ✅ Removed duplicate userSchema.index({ phone: 1 }, { unique: true });

userSchema.pre("save", function (next) {
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
  await mongoose
    .model("Hotel")
    .updateMany({ _id: { $in: user.wishlists } }, { $pull: { wishlists: user._id } });
  await mongoose.model("Booking").deleteMany({ _id: { $in: user.bookings } });
  await mongoose.model("Contact").deleteMany({ _id: { $in: user.feedbacks } });

  next();
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

console.log("New Schema Exported!");

export { User };
