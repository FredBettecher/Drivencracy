import joi from "joi";

export const choiceSchema = joi.object({
    _id: joi.string().hex().length(24),
    title: joi.string().required(),
    pollId: joi.string().hex().length(24).required()
});