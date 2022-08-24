import AuththorController from "../controllers/AuthorController";
import express from "express";

const authorRouter = express.Router();

authorRouter.get("/", AuththorController.findAuthors);
authorRouter.post("/", AuththorController.createAuthor);
authorRouter.get("/:id", AuththorController.findAuthor);
authorRouter.put("/:id", AuththorController.updateAuthor);
authorRouter.delete("/:id", AuththorController.deleteAuthor);

export default authorRouter;
