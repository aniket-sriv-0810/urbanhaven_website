import Joi from "joi";

const bookingSchemaValidation = Joi.object({
    userDetails: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
        "string.pattern.base": "Invalid User ID format.",
        "any.required": "User details are required.",
    }),
    hotelDetails: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
        "string.pattern.base": "Invalid Hotel ID format.",
        "any.required": "Hotel details are required.",
    }),
    checkInDate: Joi.date().iso().required().messages({
        "date.format": "Check-in date must be a valid ISO date.",
        "any.required": "Check-in date is required.",
    }),
    checkOutDate: Joi.date().iso().greater(Joi.ref('checkInDate')).required().messages({
        "date.greater": "Check-out date must be after check-in date.",
        "any.required": "Check-out date is required.",
    }),
    room: Joi.number().min(1).max(4).required().messages({
        "number.min": "At least one room is required.",
        "number.max": "A maximum of four rooms can be booked.",
        "any.required": "Room count is required.",
    }),
    adultCount: Joi.number().min(1).max(4).required().messages({
        "number.min": "At least one adult is required.",
        "number.max": "A maximum of four adults can be booked.",
        "any.required": "Adult count is required.",
    }),
    infantCount: Joi.number().min(0).max(4).default(0).messages({
        "number.min": "Infant count cannot be negative.",
        "number.max": "A maximum of four infants can be booked.",
    }),
    totalAmount: Joi.number().min(0).messages({
        "number.min": "Payable Amount cannot be negative.",
         "any.required": "Payment Amount is required."
    }),
    paymentDetails: Joi.string().trim().required().messages({
        "string.empty": "Payment details are required.",
        "any.required": "Payment details are required.",
    }),
    status: Joi.string().valid("Paid", "Pending").default("Pending").messages({
        "any.only": "Payment status must be either 'Paid' or 'Pending'.",
    }),
});

export { bookingSchemaValidation };
