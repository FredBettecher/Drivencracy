import joi from "joi";
import date from "@joi/date";

const joiDate = joi.extend(date);

export const pollSchema = joi.object({
  _id: joi.string().hex().length(24),
  title: joi.string().required(),
  expireAt: joiDate.date().empty('').format('YYYY-MM-DD HH:mm')
});

