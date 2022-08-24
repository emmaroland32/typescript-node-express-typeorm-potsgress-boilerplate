import {
  CreateAuthorDto,
  IAuthorResponse,
  UpdateAuthorDto,
} from "../entity/dtos/AuthorDto";

import { AppDataSource } from "../config/database/dev.typeorm";
import { AuthorEntity } from "../entity/Author";
import { IAuthorRepository } from "../interfaces/IAuthor";

class AuthorRepository implements IAuthorRepository {
  constructor() {}
  async findAuthors(): Promise<AuthorEntity[]> {
    const authors = await AppDataSource.createQueryBuilder(
      AuthorEntity,
      "author"
    )
      .leftJoinAndSelect("author.books", "book")
      .getMany();

    return authors;
  }

  async findAuthorById(id: string): Promise<AuthorEntity | null> {
    const author = await AppDataSource.createQueryBuilder(
      AuthorEntity,
      "author"
    )
      .leftJoinAndSelect("author.books", "book")
      .where("author.id = :id", { id })
      .getOne();

    return author;
  }

  async findAuthorByEmail(email: string): Promise<AuthorEntity | null> {
    return await AppDataSource.createQueryBuilder(AuthorEntity, "author")
      .leftJoinAndSelect("author.books", "book")
      .where("author.email = :email", { email })
      .getOne();
  }

  async updateAuthor(
    id: string,
    updateAuthorDto: UpdateAuthorDto
  ): Promise<IAuthorResponse> {
    const newAuthor = await AppDataSource.createQueryBuilder()
      .update(AuthorEntity)
      .set(updateAuthorDto)
      .where("author.id = :id", { id })
      .returning("*")
      .updateEntity(true)
      .execute();
    if (!newAuthor) {
      throw new Error(
        `Something Went wrong while updating Author with id: ${id}`
      );
    }
    return newAuthor.raw[0];
  }

  async createAuthor(
    createAuthorDto: CreateAuthorDto
  ): Promise<IAuthorResponse | AuthorEntity> {
    let author = await AppDataSource.createQueryBuilder()
      .insert()
      .into(AuthorEntity)
      .values(createAuthorDto)
      .returning("*")
      .updateEntity(true)
      .execute();
    return author.raw[0];
  }

  async deleteAuthor(id: string): Promise<IAuthorResponse> {
    const author = await AppDataSource.createQueryBuilder(
      AuthorEntity,
      "author"
    )
      .softDelete()
      .where("author.id = :id", { id })
      .execute();

    return author.raw;
  }
}

export default new AuthorRepository();
