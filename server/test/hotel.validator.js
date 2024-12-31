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
  
    image: Joi.string().uri().optional().default("https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI=").messages({
        "string.uri": "Image must be a valid URI.",
    }),
    review: Joi.array()
        .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)) // Matches MongoDB ObjectId format
        .optional(),
    
});

export { hotelSchemaValidation };
