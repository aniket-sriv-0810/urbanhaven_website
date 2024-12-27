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
    pincode: Joi.string()
        .length(6) // Ensures pincode is exactly 6 digits long
        .pattern(/^\d+$/) // Ensures it's numeric
        .required()
        .messages({
            "string.length": "Pincode must be exactly 6 digits.",
            "string.pattern.base": "Pincode must contain only digits.",
            "any.required": "Pincode is required.",
        }),
    image: Joi.string().uri().optional().default("https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI=").messages({
        "string.uri": "Image must be a valid URI.",
    }),
    location: Joi.object({
        type: Joi.string().valid("Point").required().messages({
            "any.only": "Location type must be 'Point'.",
            "any.required": "Location type is required.",
        }),
        coordinates: Joi.array()
            .length(2)
            .items(Joi.number().required())
            .required()
            .messages({
                "array.length": "Coordinates must contain exactly two elements [longitude, latitude].",
                "array.includesRequiredUnknowns": "Coordinates must contain valid numbers.",
                "any.required": "Coordinates are required.",
            }),
    }).required().messages({
        "any.required": "Location details are required.",
    }),
    review: Joi.array()
        .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)) // Matches MongoDB ObjectId format
        .optional(),
    userOwner: Joi.array()
        .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/).required())
        .required()
        .messages({
            "any.required": "Owner details are required.",
            "string.pattern.base": "Invalid owner ID format.",
        }),
});

export { hotelSchemaValidation };
