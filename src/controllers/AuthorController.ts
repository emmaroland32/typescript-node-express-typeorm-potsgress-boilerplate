import { Request, Response } from "express";

import authorService from "../services/AuthorService";

class AuthorController {
  async findAuthors(_: Request, res: Response) {
    const authors = await authorService.findAuthors();
    res.status(authors["statusCode"]).send(authors);
  }

  async createAuthor(req: Request, res: Response) {
    const author = await authorService.createAuthor(req.body);
    res.status(author["statusCode"]).send(author);
  }

  async findAuthor(req: Request, res: Response) {
    const author = await authorService.findAuthor(req.params.id);
    res.status(author["statusCode"]).send(author);
  }

  async updateAuthor(req: Request, res: Response) {
    const author = await authorService.updateAuthor(req.params.id, req.body);
    res.status(author["statusCode"]).send(author);
  }

  async deleteAuthor(req: Request, res: Response) {
    const author = await authorService.deleteAuthor(req.params.id);
    res.status(author["statusCode"]).send(author);
  }
}

const authorController = new AuthorController();
export default authorController;
