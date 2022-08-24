import { Request, Response } from "express";

import bookService from "../services/BookService";

export class BookController {
  async findBooks(req: Request, res: Response) {
    const books = await bookService.findBooks(req.query);
    res.status(books["statusCode"]).send(books);
  }

  async createBook(req: Request, res: Response) {
    const book = await bookService.createBook(req.body);
    res.status(book["statusCode"]).send(book);
  }

  async findBook(req: Request, res: Response) {
    const book = await bookService.findBook(req.params.id);
    res.status(book["statusCode"]).send(book);
  }

  async updateBook(req: Request, res: Response) {
    const book = await bookService.updateBook(req.params.id, req.body);
    res.status(book["statusCode"]).send(book);
  }

  async deleteBook(req: Request, res: Response) {
    const book = await bookService.deleteBook(req.params.id);
    res.status(book["statusCode"]).send(book);
  }
}
