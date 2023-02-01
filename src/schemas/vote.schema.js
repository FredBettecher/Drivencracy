import joi from "joi";

export const voteSchema = joi.object({
    _id: joi.string().hex().length(24),
    createdAt: joi.date().format('YYYY-MM-DD HH:mm'),
    choiceId: joi.string().hex().length(24)
})