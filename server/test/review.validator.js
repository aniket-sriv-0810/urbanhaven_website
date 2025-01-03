import Joi from "joi";

const reviewSchemaValidation = Joi.object({

    rating: Joi.number().min(1).max(5).required().messages({
        "number.min": "Rating must be at least 1.",
        "number.max": "Rating cannot exceed 5.",
        "any.required": "Rating is required.",
    }),
    comment: Joi.string().trim().max(200).optional().messages({
        "string.max": "Comment cannot exceed 200 characters.",
    }),
});

export { reviewSchemaValidation };
