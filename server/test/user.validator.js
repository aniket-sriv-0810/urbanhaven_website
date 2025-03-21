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
    image: Joi.any().optional().default("https://media-hosting.imagekit.io//4bc72ff0889f4681/demo.png?Expires=1837020820&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=c3Nq6Mu7wtR7-l57wCuFJDWqnmAYe1mnhTV60rRh~Jbr8iEoriWR0qAXj7ZZTfT4XwDeVixlpLg0spaVCXXnT0PkgZgvPx8uAqEOl2brHCHXKkKbKmE3Szgkh6l~dfwmJhUcL1pLE0v23fLt6xcVnwglPQ~tZ1fmD02KYcjDD1cX8lTGmF2wSHJv0OVScK2Aw4mHuUSvWbBrDsRt7PpFfWskmXiWUG~QuWDgbcHuSrS2r2ffQ98PdMT96uhXeNRwZsmFs8BSzj15gVYC05hBdkk~7uKhWuA6rl5eSh61hqCLvkjElDrHe7wLa7tfJwUVYRcYicu6LTU0UIeNckAViw__"),
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
