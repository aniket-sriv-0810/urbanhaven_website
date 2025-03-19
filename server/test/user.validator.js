import Joi from "joi";
import {User} from "../model/user.model.js"; // Assuming you have a User model

const userSchemaValidation = Joi.object({
    name: Joi.string().trim().optional().messages({
        "string.empty": "Name field is required !",
    }),
    username: Joi.string().trim().required().custom(async (value, helper) => {
        const existingUser = await User.findOne({ username: value });
        if (existingUser) {
            return helper.message('Username is already taken');
        }
        return value;
    }).messages({
        "string.empty": "Username field is required !",
        "any.required": "Username is required !",
    }),
    phone: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .optional()
        .custom(async (value, helper) => {
            const existingPhone = await User.findOne({ phone: value });
            if (existingPhone) {
                return helper.message('Phone number is already in use');
            }
            return value;
        })
        .messages({
            "string.pattern.base": "Phone number must be a 10-digit number.",
        }),
    email: Joi.string().email().required().custom(async (value, helper) => {
        const existingEmail = await User.findOne({ email: value });
        if (existingEmail) {
            return helper.message('Email is already registered');
        }
        return value;
    }).messages({
        "string.email": "Invalid email format.",
        "string.empty": "Email is required.",
        "any.required": "Email is required.",
    }),
    image: Joi.any().optional().default("https://media-hosting.imagekit.io//8450b6563e51411a/person.jpg?Expires=1837021220&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=d5ybsGf9x9CF2tndNXZPaEE2D7Jv6oM0woujqPnvZEo1tRIolVKCBmBJKz0Ze5Iaf7HFEIz-193BtXERHHp28s6Rooexh2-ttsIhsp5b1z-90TqIBieJGtrs-aNNawTGDM5KKL48F3jh5UBYb0CW~7WP6OOLyGUnXScY3fW4vBUeSK8ygoDc4KP~BIzOSAPuNor-x-G9a71thKwFOjpYnE-Q9hMcW8W-tEGAWA8gWB1IK613rfrs6yWDL192ayv-~2EOr6P9em7ds5NmF1SGaLU6Zeb3RW5rlp17CyT37ift7mbALGLYxkRCGh~JKUxO7jibxhPojdjudtKOAp53Pg__"),
    //  // Accept the file as `any`
    password: Joi.string().min(6).required().messages({
        "string.min": "Password must be at least 6 characters long.",
    }),
    role: Joi.string().valid("admin", "user").default("user").messages({
        "any.only": "Role must be either 'admin' or 'user'.",
    }),
    reviews: Joi.array()
        .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)) // Matches MongoDB ObjectId format
        .optional(),
    wishlists: Joi.array()
        .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)) // Matches MongoDB ObjectId format
        .optional(),
    bookings: Joi.array()
        .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)) // Matches MongoDB ObjectId format
        .optional(),
    feedbacks: Joi.array()
        .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)) // Matches MongoDB ObjectId format
        .optional(),

});

export { userSchemaValidation };
