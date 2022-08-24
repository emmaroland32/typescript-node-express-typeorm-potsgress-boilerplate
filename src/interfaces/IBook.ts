import {
  CreateBookDto,
  IBookResponse,
  UpdateBookDto,
} from "../entity/dtos/BookDto";
import { IBookQuery, IQuery } from "./shared/IQuery";

import { BookEntity } from "../entity/Book";

export interface IBook {
  findBooks(query?: IBookQuery): Promise<BookEntity[] | IBookResponse>;
  findBook(id?: string): Promise<BookEntity | IBookResponse | null>;
  createBook(createBookDto: CreateBookDto): Promise<BookEntity | IBookResponse>;
  updateBook(
    id: string,
    updateBookDto: UpdateBookDto
  ): Promise<BookEntity | IBookResponse>;
  deleteBook(id: string): Promise<BookEntity | IBookResponse>;
}

export interface IBookRepository extends IBook {}

export interface IBookService extends IBook {}
