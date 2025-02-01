import Joi from "joi";

const hotelSchemaValidation = Joi.object({
    title: Joi.string().trim().required().messages({
        "string.empty": "Title is required.",
        "any.required": "Title is required.",
    }),
    description: Joi.string().trim().required().messages({
        "string.empty": "Description is required.",
        "any.required": "Description is required.",
    }),
    price: Joi.number().min(0).required().messages({
        "number.min": "Price must be greater than or equal to 0.",
        "any.required": "Price is required.",
    }),
    city: Joi.string().trim().required().messages({
        "string.empty": "City is required.",
        "any.required": "City is required.",
    }),
    state: Joi.string().trim().required().messages({
        "string.empty": "State is required.",
        "any.required": "State is required.",
    }),
    country: Joi.string().trim().required().messages({
        "string.empty": "Country is required.",
        "any.required": "Country is required.",
    }),
    image: Joi.any(),
    review: Joi.array()
        .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)) // Matches MongoDB ObjectId format
        .optional(),

});

export { hotelSchemaValidation };
