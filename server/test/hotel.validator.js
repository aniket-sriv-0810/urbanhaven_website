import Joi from "joi";

 const hotelSchemaValidation = Joi.object({
    title: Joi.string().trim().required().messages({
        "string.empty": "Title is required.",
    }),
    description: Joi.string().trim().required().messages({
        "string.empty": "Description is required.",
    }),
    image: Joi.string().trim().required().messages({
        "string.empty": "Image is required.",
    }),
    price: Joi.number().min(0).required().messages({
        "number.min": "Price must be greater than or equal to 0.",
        "any.required": "Price is required.",
    }),
    city: Joi.string().trim().required().messages({
        "string.empty": "City is required.",
    }),
    state: Joi.string().trim().required().messages({
        "string.empty": "State is required.",
    }),
    country: Joi.string().trim().required().messages({
        "string.empty": "Country is required.",
    }),
});

export {hotelSchemaValidation};