import Joi from "joi";

const userSchemaValidation = Joi.object({
    name: Joi.string().trim().optional().messages({
        "string.empty": "Name cannot be empty.",
    }),
    username: Joi.string().trim().required().messages({
        "string.empty": "Username is required.",
        "any.required": "Username is required.",
    }),
    phone: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .optional()
        .messages({
            "string.pattern.base": "Phone number must be a 10-digit number.",
        }),
    email: Joi.string().email().required().messages({
        "string.email": "Invalid email format.",
        "string.empty": "Email is required.",
        "any.required": "Email is required.",
    }),
    image: Joi.string().uri().optional().default("https://e7.pngegg.com/pngimages/81/570/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png").messages({
        "string.uri": "Image must be a valid URI.",
    }),
    googleId: Joi.string().optional(),
    role: Joi.string().valid("admin", "user").default("user").messages({
        "any.only": "Role must be either 'admin' or 'user'.",
    }),
});

export { userSchemaValidation };
