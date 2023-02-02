import joi from "joi";

export const voteSchema = joi.object({
    _id: joi.string().hex().length(24),
    createdAt: joi.string().required(),
    choiceId: joi.string().hex().length(24).required()
})