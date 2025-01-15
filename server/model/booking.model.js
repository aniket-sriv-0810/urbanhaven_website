import mongoose from 'mongoose';
const Schema = mongoose.Schema ;

const bookingSchema = new Schema(
    {
        userDetails:{
            type: Schema.Types.ObjectId,
            ref:"User",
            required: [true, "User details are required !"]
        },
        hotelDetails:{
            type: Schema.Types.ObjectId,
            ref:"Hotel",
            required: [true, "Hotel details are required !"],
        },
        checkInDate :{
            type:Date,
            required: [true, "Check in date is required !"]
        },
        checkOutDate :{
            type:Date,
            required: [true, "Check out date is required !"]
        },
        room:{
            type:Number,
            min:[1,"At least one room is required !"],
            max:[4,"Maximum four room can be booked !"],
            required:[true, "Room count is required !"],
        },
        adultCount:{
            type:Number,
            min:[1,"At least one adult is required !"],
            max:[6,"Maximum  four adult can be booked !"],
            required:[true, "Adult count is required !"],
        },
        infantCount:{
            type:Number,
            min:[0,"Infant can't be negative !"],
            max:[4,"Maximum  four infant can be booked !"],
            required:[true, "Infant count is required !"],
            default:0,
        },
        totalAmount:{
            type:Number,
            min:[0, "Amount should be positive !"],
            required:[true , "Amount is required !"],
        },
        paymentDetails:{
            type:String,
            required:[true, "Payment details are required !"],
        },
        status: {
            type: String,
            enum: ["Confirmed", "Cancelled", "Pending"],
            default: "Pending",
        },
    } ,
    {
        timestamps:true,
    }
);

const Booking = mongoose.model('Booking' , bookingSchema);
export default Booking;