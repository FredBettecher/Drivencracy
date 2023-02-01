import { Router } from "express";
import {pollGet, pollPost} from "../controllers/poll.controller.js";

const pollRoute = Router();

pollRoute.post("/poll", pollPost);
pollRoute.get("/poll", pollGet);

const routes = { pollRoute };

export default routes;