import express from "express";
import { home, signUp, login, search } from "../controllers/mainController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/search", search);
rootRouter.post("/signUp", signUp);
rootRouter.post("/login", login);
rootRouter.get("/search", search);

export default rootRouter;
