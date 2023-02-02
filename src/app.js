import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/routes.js";

dotenv.config()

const app = express();
app.use(express.json());
app.use(cors());

app.use(routes.pollRoute);
app.use(routes.choiceRoute);

app.listen(process.env.PORT, () => console.log("Online on PORT:" + process.env.PORT));