import joi from "joi";

export const pollSchema = joi.object({
    _id: joi.string().hex().length(24).required(),
    title: joi.string().required(),
    expireAt: joi.date().format('YYYY-MM-DD').required()
});