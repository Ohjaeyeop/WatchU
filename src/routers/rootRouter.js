import express from "express";
import { home, signUp, login } from "../controllers/mainController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.post("/signUp", signUp);
rootRouter.post("/login", login);

export default rootRouter;
