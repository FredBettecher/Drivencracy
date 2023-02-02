import joi from "joi";
import date from "@joi/date";

const joiDate = joi.extend(date);

export const voteSchema = joi.object({
    _id: joi.string().hex().length(24),
    createdAt: joiDate.date().empty('').format('YYYY-MM-DD HH:mm'),
    choiceId: joi.string().hex().length(24).required()
})