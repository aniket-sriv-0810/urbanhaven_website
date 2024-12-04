import Joi from "joi";

const reviewSchemaValidation = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "User ID is required for review.",
    }),
    review: Joi.number().min(1).max(5).required().messages({
        "number.min": "Review rating must be at least 1.",
        "number.max": "Review rating cannot exceed 5.",
        "any.required": "Review rating is required.",
    }),
    comment: Joi.string().trim().optional().messages({
        "string.empty": "Comment cannot be empty.",
    }),
});

export {reviewSchemaValidation} ;