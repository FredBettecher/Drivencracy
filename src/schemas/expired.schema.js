import joi from "joi";
import date from "@joi/date";

const joiDate = joi.extend(date);

export const isExpiredSchema = joi.object({
    expireAt: joiDate.date().less('now')
});