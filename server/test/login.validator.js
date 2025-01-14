import Joi from "joi";
import {User} from "../model/user.model.js"; // Assuming you have a User model

const loginUserValidation = Joi.object({

    username: Joi.string().trim().required().messages({
        "string.empty": "Username field is required !",
        "any.required": "Username is required !",
    }),

    password: Joi.string().min(6).required().messages({
         "string.empty": "password field is required !",
        "string.min": "Password must be at least 6 characters long.",
    }),

});

export { loginUserValidation };