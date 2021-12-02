import express from "express";
import { home, search, detail } from "../controllers/mainController";
import { login, signUp, logout } from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/search", search);
rootRouter.get("/movie/:id", detail);
rootRouter.post("/signUp", signUp);
rootRouter.post("/login", login);
rootRouter.post("/logout", logout);

export default rootRouter;
