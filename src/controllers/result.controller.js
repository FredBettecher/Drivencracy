import { ObjectId } from "mongodb";
import { poll, choice, vote, result } from "../database/db.js";

export const resultGet = async (req, res) => {
    const pollId = req.params.id;
    const selectedPoll = await poll.find( { _id: new ObjectId(pollId) } ).toArray();
    const selectedChoice = await choice.find( { pollId: new ObjectId(pollId) } ).toArray();
    const resultExists = await result.findOne( {title: selectedPoll[0].title} )
    const voteList = await vote.aggregate([
      { $match: { choiceId: { $in: selectedChoice.map(c => c._id) } } },
      { $group: { _id: "$choiceId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]).toArray();
    const mostVotedChoice = await choice.find({ _id: voteList[0]._id }).toArray();

    try {
        if(!selectedPoll) {
            return res.status(404).send("Enquete não existe.");
        }

        if (voteList.length === 0) {
            return res.status(204).send("Nenhum voto encontrado.");
        }
        
        if(resultExists) {
            await result.updateOne(
                { title: selectedPoll[0].title },
                { $set: { result: {
                    title: mostVotedChoice[0].title,
                    votes: voteList[0].count
                } } }
            );
            const finalResult = await result.find( { title: selectedPoll[0].title} ).toArray()
            return res.send(finalResult);

        } else {
            const newResult = await result.insertOne({
                title: selectedPoll[0].title,
                expireAt: selectedPoll[0].expireAt,
                result: {
                    title: mostVotedChoice[0].title,
                    votes: voteList[0].count
                }
            });
            const finalResult = await result.find( { title: selectedPoll[0].title} ).toArray()
            return res.send(finalResult);
        }

    } catch(err) {
        return res.status(500).send(err.message);
    }
    
}