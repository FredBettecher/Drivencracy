import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { poll, choice, vote } from "../database/db.js";

export const votePost = async (req, res) => {
    const choiceId = req.params.id;
    const choiceExist = await choice.findOne( { _id: new ObjectId(choiceId) } );
    const selectedPoll = await poll.find( { _id: new ObjectId(choiceExist.pollId) } ).toArray();

    try {
        if(!choiceExist) {
            return res.status(404).send("Opção de voto não existe.");
        }

        if(dayjs().isAfter(dayjs(selectedPoll[0].expireAt))) {
            return res.status(403).send("Enquete já expirou.");
        }

        const newVote = await vote.insertOne({
            createdAt: dayjs(Date.now()).format('YYYY-DD-MM HH:mm'),
            choiceId: new ObjectId(choiceId)
        });

        return res.status(201).send();

    } catch(err) {
        return res.status(500).send(err.message);
    }
}