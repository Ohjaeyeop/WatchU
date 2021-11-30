import express from "express";
import { detail } from "../controllers/mainController";

const movieRouter = express.Router();

movieRouter.get("/:id([0-9]*$)", detail);

export default movieRouter;
