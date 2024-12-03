import Review from '../model/review.model.js';
import {User} from '../model/user.model.js';

// Create a new Review
const createReview = async(req , res) => {
    let {id} = req.params;
    let {name , review , comment} = req.params ;
    const hotel = await User.findById(id);
    const newReview = new Review({ name , review , comment});
    hotel.review.push(newReview);
    await hotel.save();
    await newReview.save();
    console.log("Review saved successfully !");
    return res.status(200).json({newReview});
}


export {createReview};