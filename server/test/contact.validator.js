import Joi from "joi";

const contactSchemaValidation = Joi.object({
    user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
        "string.pattern.base": "Invalid User ID format.",
        "any.required": "User details are required.",
    }),
    message: Joi.string().trim().required().messages({
        "string.empty": "Message is required.",
        "any.required": "Message is required.",
    }),
});

export { contactSchemaValidation };
