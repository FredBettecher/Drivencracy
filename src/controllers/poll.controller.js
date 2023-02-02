import dayjs from "dayjs";
import { poll } from "../database/db.js";
import { pollSchema } from "../schemas/poll.schema.js";

export const pollPost = async (req, res) => {
    let { title, expireAt } = req.body;
    const pollValidation = pollSchema.validate( { title, expireAt } );
    const expireDate = dayjs(Date.now() + 2.592e+9).format('YYYY-MM-DD HH:mm');

    try {
        if(pollValidation.error){
            return res.status(422).send(pollValidation.error.message);
        } else if(expireAt === "" || expireAt === null) {
            const newPoll = await poll.insertOne({
                title,
                expireAt: expireDate
            });
            res.status(201).send("Enquete criada com sucesso!");
            return newPoll;
        } else {
            const newPoll = await poll.insertOne({
                title,
                expireAt
            });
            res.status(201).send("Enquete criada com sucesso!");
            return newPoll;
        }

    } catch(err) {
        return res.status(500).send(err.message);
    }
}

export const pollGet = async (req, res) => {
    poll.find({}).toArray().then(pollList => {
        return res.send(pollList);
    });
}

const pollControllers = { pollPost, pollGet };
export default pollControllers;