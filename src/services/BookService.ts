import {
  CreateBookDto,
  IBookResponse,
  UpdateBookDto,
} from "../entity/dtos/BookDto";
import { IBookQuery, IQuery } from "../interfaces/shared/IQuery";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import AppResponse from "../utils/helpers/AppResponse";
import { BookEntity } from "../entity/Book";
import { BookRepository } from "../repository/BookRepository";
import { IBookService } from "../interfaces/IBook";
import getErrorMessage from "../utils/error/errorMessage";

class BookService implements IBookService {
  private bookRepository = new BookRepository();
  async findBooks(bookQuery: IBookQuery): Promise<IBookResponse> {
    try {
      console.log(bookQuery);
      const books = await this.bookRepository.findBooks(bookQuery);

      return new AppResponse(ReasonPhrases.OK, StatusCodes.OK, books);
    } catch (err) {
      return new AppResponse(getErrorMessage(err), StatusCodes.BAD_REQUEST);
    }
  }
  async findBook(id: string): Promise<IBookResponse> {
    try {
      const book = await this.bookRepository.findBook(id);
      if (!book) {
        return new AppResponse("Book not found", StatusCodes.NOT_FOUND);
      }
      return new AppResponse(ReasonPhrases.OK, StatusCodes.OK, book);
    } catch (err) {
      return new AppResponse(getErrorMessage(err), StatusCodes.BAD_REQUEST);
    }
  }

  async createBook(createBookDto: CreateBookDto): Promise<IBookResponse> {
    try {
      const book = await this.bookRepository.createBook(createBookDto);

      return new AppResponse(ReasonPhrases.OK, StatusCodes.OK, book);
    } catch (err) {
      return new AppResponse(getErrorMessage(err), StatusCodes.BAD_REQUEST);
    }
  }

  async updateBook(
    id: string,
    updateBookDto: UpdateBookDto
  ): Promise<IBookResponse> {
    try {
      const book = await this.bookRepository.findBook(id);
      if (!book) {
        return new AppResponse("Book not found", StatusCodes.NOT_FOUND);
      }
      const newBook = await this.bookRepository.updateBook(id, updateBookDto);
      return new AppResponse(ReasonPhrases.OK, StatusCodes.OK, newBook);
    } catch (err) {
      return new AppResponse(getErrorMessage(err), StatusCodes.BAD_REQUEST);
    }
  }
  async deleteBook(id: string): Promise<IBookResponse> {
    try {
      const book = await this.bookRepository.findBook(id);
      if (!book) {
        return new AppResponse("Book not found", StatusCodes.NOT_FOUND);
      }
      const deletedBook = await this.bookRepository.deleteBook(id);
      return new AppResponse(ReasonPhrases.OK, StatusCodes.OK, deletedBook);
    } catch (err) {
      return new AppResponse(getErrorMessage(err), StatusCodes.BAD_REQUEST);
    }
  }
}

export default new BookService();
