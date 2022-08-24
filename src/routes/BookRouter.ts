import { BookController } from "../controllers/BookController";
import express from "express";

const bookRouter = express.Router();
const bookControler = new BookController();

bookRouter.get("/", bookControler.findBooks);
bookRouter.get("/:id", bookControler.findBook);
bookRouter.post("/", bookControler.createBook);
bookRouter.put("/:id", bookControler.updateBook);
bookRouter.delete("/:id", bookControler.deleteBook);

export default bookRouter;
