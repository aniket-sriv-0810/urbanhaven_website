import dotenv from 'dotenv';
dotenv.config({
    path:"../.env"
})
import mongoose from "mongoose";
import sampleData from "./sampleData.js";
import Hotel from '../model/hotel.model.js';
import { User } from '../model/user.model.js';
import Review from '../model/review.model.js';
import Booking from '../model/booking.model.js';
// Database configuration
main()
.then(() =>{
    console.log("DB Success !");
})
.catch((err) =>{
    console.error("DB Error !" , err);
})

async function main(){
    await mongoose.connect(process.env.MONGODB_URI);
}

import Faq from "../model/faq.model.js";

const faqData = [
    {
        title: "How do I book a hotel or home on Urbanhaven?",
        solution: "To book a stay, simply enter your destination and travel dates in the search bar. Browse through the available listings, select your preferred property, and proceed with the booking by following the checkout steps."
    },
    {
        title: "What payment methods does Urbanhaven accept?",
        solution: "We accept major credit/debit cards, PayPal, UPI, net banking, and digital wallets. All transactions are securely processed to ensure a safe booking experience."
    },
    {
        title: "What is the cancellation and refund policy?",
        solution: "Our cancellation policy depends on the host's terms. Some properties offer free cancellation up to a certain period before check-in, while others may have non-refundable policies. Refunds are processed within 5-7 business days if applicable."
    },
    {
        title: "How can I contact the host before booking?",
        solution: "Once you select a listing, you will see an option to message the host. You can ask about amenities, location details, or any specific requirements before confirming your booking."
    },
    {
        title: "Is Urbanhaven safe for both guests and hosts?",
        solution: "Yes, we ensure safety through verified listings, secure payments, and 24/7 customer support. We also encourage hosts and guests to review each other after each stay to maintain trust and transparency."
    },
    {
        title: "What should I do if I face issues during my stay?",
        solution: "If you encounter any problems during your stay, contact your host first for immediate assistance. If the issue remains unresolved, reach out to Urbanhaven's support team for further help."
    }
];

// Storing sample dataset in database
const initDB = async() => {
    // await Hotel.deleteMany({});
    // await User.deleteMany({});
    // await Booking.deleteMany({});
    // await Review.deleteMany({});
    // await Hotel.insertMany(sampleData);
    await Faq.insertMany(faqData);
    console.log("Data inserted successfully !");
}

initDB();