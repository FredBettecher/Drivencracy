import { Router } from "express";
import { choicePost, choiceGet } from "../controllers/choice.controller.js";
import {pollGet, pollPost} from "../controllers/poll.controller.js";
import { resultGet } from "../controllers/result.controller.js";
import { votePost } from "../controllers/vote.controller.js";

const pollRoute = Router();
pollRoute.post("/poll", pollPost);
pollRoute.get("/poll", pollGet);

const choiceRoute = Router();
choiceRoute.post("/choice", choicePost);
choiceRoute.get("/poll/:id/choice", choiceGet)

const voteRoute = Router();
voteRoute.post("/choice/:id/vote", votePost);
voteRoute.get("/poll/:id/result", resultGet);

const routes = { pollRoute, choiceRoute, voteRoute };

export default routes;