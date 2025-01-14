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
    image: Joi.string().uri().optional().default("https://e7.pngegg.com/pngimages/81/570/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png").messages({
        "string.uri": "Image must be a valid URI.",
    }),
    password: Joi.string().min(6).required().messages({
        "string.min": "Password must be at least 6 characters long.",
    }),
    role: Joi.string().valid("admin", "user").default("user").messages({
        "any.only": "Role must be either 'admin' or 'user'.",
    }),
});

export { userSchemaValidation };
