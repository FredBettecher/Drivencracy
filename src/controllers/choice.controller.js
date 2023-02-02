import { ObjectId } from "mongodb";
import { poll, choice } from "../database/db.js";
import { choiceSchema } from "../schemas/choice.schema.js";
import { isExpiredSchema } from "../schemas/expired.schema.js";

export const choicePost = async (req, res) => {
    const { title, pollId } =  req.body;
    const choiceValidation = choiceSchema.validate( { title, pollId } );
    const selectedPoll = poll.findOne( { _id: ObjectId(pollId) } );
    const titleExist = choice.findOne( { title: title } );
    const isExpired = isExpiredSchema.validate(selectedPoll.expireAt);

    try {
        if(choiceValidation.error) {
            return res.status(422).send(choiceValidation.error.message);
        }

        if(!selectedPoll) {
            return res.status(404).send("Enquete não existe.");
        }

        if(titleExist) {
            return res.status(409).send("Essa opção já existe.");
        }

        if(isExpired) {
            return res.status(403).send("Enquete já expirou.")
        }

        const newChoice = await choice.insertOne({
            title,
            pollId
        });

        await poll.insertOne(newChoice);

        res.status(201).send("Opção de voto criada com sucesso!");
        return newChoice;

    } catch(err) {
        return res.status(501).send(err.message);
    }
}