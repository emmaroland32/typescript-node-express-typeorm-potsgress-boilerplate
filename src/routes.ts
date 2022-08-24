import authorRouter from "./routes/AuthorRouter";
import bookRouter from "./routes/BookRouter";
import express from "express";

const routes = express();

routes.use("/authors", authorRouter);
routes.use("/books", bookRouter);

export default routes;
