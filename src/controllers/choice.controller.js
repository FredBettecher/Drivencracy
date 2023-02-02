import { poll, choice } from "../database/db.js";
import { choiceSchema } from "../schemas/choice.schema.js";

export const choicePost = async (req, res) => {
    const { title, pollId } =  req.body;
    const choiceValidation = choiceSchema.validate( { title, pollId } );
    
}