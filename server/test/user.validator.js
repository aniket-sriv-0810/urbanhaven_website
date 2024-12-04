import Joi from "joi";

 const userSchemaValidation = Joi.object({
    name: Joi.string().trim().required().messages({
        "string.empty": "Name is required.",
    }),
    username: Joi.string().trim().required().messages({
        "string.empty": "Username is required.",
    }),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        "string.pattern.base": "Phone number must be a valid 10-digit number.",
        "any.required": "Phone number is required.",
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Email must be a valid email address.",
        "any.required": "Email is required.",
    }),
    password: Joi.string().min(6).required().messages({
        "string.min": "Password must be at least 6 characters long.",
        "any.required": "Password is required.",
    }),
});


export {userSchemaValidation};