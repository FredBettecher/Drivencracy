import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

try {
    await mongoClient.connect();
    db = mongoClient.db();
    console.log("Database connected to MongoDB.");

} catch(err) {
    console.log(err.message);
}

export const poll = db.collection("poll");
export const choice = db.collection("choice");
export const vote = db.collection("vote");
export const result = db.collection("result");