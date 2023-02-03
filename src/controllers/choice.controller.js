import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { poll, choice } from "../database/db.js";
import { choiceSchema } from "../schemas/choice.schema.js";
import { isExpiredSchema } from "../schemas/expired.schema.js";

export const choicePost = async (req, res) => {
    const { title, pollId } =  req.body;
    const choiceValidation = choiceSchema.validate( { title, pollId } );
    const selectedPoll = await poll.find( { _id: new ObjectId(pollId) } ).toArray();
    const titleExist = await choice.find( { title: title } ).toArray();
    // const isExpiredValidation = isExpiredSchema.validate( { expireAt: selectedPoll.expireAt } );
    console.log(selectedPoll)

    try {
        if(choiceValidation.error) {
            return res.status(422).send(choiceValidation.error.message);
        }

        if(selectedPoll.title === "" ) {
            return res.status(404).send("Enquete não existe.");
        }

        if(titleExist === title) {
            return res.status(409).send("Essa opção já existe.");
        }

        if(dayjs().isAfter(dayjs(selectedPoll[0].expireAt))) {
            return res.status(403).send("Enquete já expirou.");
        }

        const newChoice = await choice.insertOne({
            title,
            pollId
        });

        await poll.insertOne(newChoice);

        res.status(201).send("Opção de voto criada com sucesso!");
        return newChoice;

    } catch(err) {
        return res.status(500).send(err.message);
    }
}