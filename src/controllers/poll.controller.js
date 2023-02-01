import dayjs from "dayjs";
import { poll } from "../database/db.js"
import { pollSchema } from "../schemas/poll.schema.js";

export default async function pollPost(req, res) {
    const { title, expireAt } = req.body;
    const pollValidation = pollSchema.validate( { title, expireAt } );
    const date = dayjs.Dayjs(Date.now()).format('YYYY-MM-DD', 'HH:mm').add(30, "day");
    console.log(date);

    try {
        if(pollValidation.error){
            return res.status(422).send("Formato inválido.");
        }

        if(expireAt === "") {
            return(
                await poll.insertOne({
                    title,
                    expireAt: date
                })
            );
        } else {
            return(
                await poll.insertOne({
                    title,
                    expireAt
                })
            );
        }

    } catch(err) {
        return res.status(500).send(err.message);
    }
}