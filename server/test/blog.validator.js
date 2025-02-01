import Joi from "joi";

const blogSchemaValidation = Joi.object({
    title: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Blog Title is required!",
            "any.required": "Blog Title is required!",
        }),
    description: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Description is required!",
            "any.required": "Description is required!",
        }),
    image: Joi.string()
        .uri()
        .required()
        .messages({
            "string.empty": "Image URL is required!",
            "string.uri": "Image must be a valid URL!",
            "any.required": "Image is required!",
        }),
});

export { blogSchemaValidation };
