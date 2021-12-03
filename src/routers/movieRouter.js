import express from "express";
import { detail } from "../controllers/mainController";
import { postReview } from "../controllers/reviewController";

const movieRouter = express.Router();

movieRouter.get("/:id([0-9]*$)", detail);
movieRouter.post("/:id([0-9]*$)", postReview);

export default movieRouter;
