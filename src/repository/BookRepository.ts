import { CreateBookDto, UpdateBookDto } from "../entity/dtos/BookDto";
import { IBookQuery, IQuery } from "../interfaces/shared/IQuery";

import { AppDataSource } from "../config/database/dev.typeorm";
import { BookEntity } from "../entity/Book";
import { IBookRepository } from "../interfaces/IBook";

export class BookRepository implements IBookRepository {
  private repository = AppDataSource;

  async findBooks(bookQuery?: IBookQuery): Promise<BookEntity[]> {
    const qTitle = bookQuery?.title;
    const qAuthor = bookQuery?.author;

    let query = await this.repository
      .createQueryBuilder(BookEntity, "book")
      .leftJoinAndSelect("book.author", "author");

    if (qTitle) {
      query = query.andWhere("title LIKE :q", { q: qTitle });
    }

    if (qAuthor) {
      query = query.andWhere("book.author LIKE :q", { q: qAuthor });
    }

    const books = query.getMany();
    return books;
  }

  async findBook(id: string): Promise<BookEntity | null> {
    const book = await this.repository
      .createQueryBuilder(BookEntity, "book")
      .leftJoinAndSelect("book.author", "author")
      .where("book.id = :id", { id })
      .getOne();
    return book;
  }
  async createBook(createBookDto: CreateBookDto): Promise<BookEntity> {
    const book = await this.repository
      .createQueryBuilder()
      .insert()
      .into(BookEntity)
      .values(createBookDto)
      .returning("*")
      .updateEntity(true)
      .execute();

    return book.raw[0];
  }
  async updateBook(
    id: string,
    updateBookDto: UpdateBookDto
  ): Promise<BookEntity> {
    const newBook = await this.repository
      .createQueryBuilder()
      .update(BookEntity)
      .set(updateBookDto)
      .where("id = :id", { id })
      .returning("*")
      .updateEntity(true)
      .execute();
    return newBook.raw[0];
  }
  async deleteBook(id: string): Promise<BookEntity> {
    const deletedBook = await this.repository
      .createQueryBuilder(BookEntity, "book")
      .softDelete()
      .where("id = :id", { id })
      .returning("*")
      .updateEntity(true)
      .execute();

    return deletedBook.raw[0];
  }
}
