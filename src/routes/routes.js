import { Router } from "express";
import { choicePost } from "../controllers/choice.controller.js";
import {pollGet, pollPost} from "../controllers/poll.controller.js";

const pollRoute = Router();
pollRoute.post("/poll", pollPost);
pollRoute.get("/poll", pollGet);

const choiceRoute = Router();
choiceRoute.post("/choice", choicePost);

const routes = { pollRoute };

export default routes;