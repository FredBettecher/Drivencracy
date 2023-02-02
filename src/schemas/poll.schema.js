import joi from "joi";
import date from "@joi/date";

joi.extend(date);

export const pollSchema = joi.object({
    _id: joi.string().hex().length(24),
    title: joi.string().required(),
    expireAt: joi.date().empty('')
});