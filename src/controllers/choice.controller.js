import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { poll, choice } from "../database/db.js";
import { choiceSchema } from "../schemas/choice.schema.js";

export const choicePost = async (req, res) => {
    const { title, pollId } =  req.body;
    const choiceValidation = choiceSchema.validate( { title, pollId } );
    const selectedPoll = await poll.find( { _id: new ObjectId(pollId) } ).toArray();
    const titleExist = await choice.findOne( { title: title } );
    console.log(selectedPoll)

    try {
        if(choiceValidation.error) {
            return res.status(422).send(choiceValidation.error.message);
        }

        if(selectedPoll.title === "" ) {
            return res.status(404).send("Enquete não existe.");
        }

        if(titleExist) {
            return res.status(409).send("Essa opção já existe.");
        }

        if(dayjs().isAfter(dayjs(selectedPoll[0].expireAt))) {
            return res.status(403).send("Enquete já expirou.");
        }

        const newChoice = await choice.insertOne({
            title,
            pollId: new ObjectId(pollId)
        });

        res.status(201).send("Opção de voto criada com sucesso!");
        return newChoice;

    } catch(err) {
        return res.status(500).send(err.message);
    }
}

export const choiceGet = async (req, res) => {
    const choiceId = req.params.id;
    const pollExist = await poll.findOne( { _id: new ObjectId(choiceId) } );
    const choiceList = await choice.find ( { pollId: new ObjectId(choiceId) } ).toArray();

    try {
        if(!pollExist) {
            return res.status(404).send("Enquete não existe.");
        }
        
        return res.send(choiceList)

    } catch(err) {
        return res.status(500).send(err.message);
    }
}