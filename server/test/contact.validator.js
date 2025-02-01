import Joi from "joi";

const contactSchemaValidation = Joi.object({
    user: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
            "string.pattern.base": "Invalid user ID format.",
            "any.required": "User ID is required!",
        }),
    message: Joi.string()
        .trim()
        .max(500)
        .required()
        .messages({
            "string.empty": "Message is required!",
            "string.max": "Message cannot exceed 500 characters!",
        }),
    status: Joi.string()
        .valid("Pending", "Resolved")
        .default("Pending")
        .messages({
            "any.only": "Status must be either 'Pending' or 'Resolved'.",
        }),
});

export { contactSchemaValidation };
