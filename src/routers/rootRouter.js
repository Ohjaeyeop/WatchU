import express from "express";
import {
  home,
  signUp,
  login,
  search,
  detail,
} from "../controllers/mainController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/search", search);
rootRouter.get("/movie/:id", detail);
rootRouter.post("/signUp", signUp);
rootRouter.post("/login", login);

export default rootRouter;
