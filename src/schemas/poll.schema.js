import joi from "joi";

export const pollSchema = joi.object({
    _id: joi.string().hex().length(24),
    title: joi.string().required(),
    expireAt: joi.string().empty('').optional()
});