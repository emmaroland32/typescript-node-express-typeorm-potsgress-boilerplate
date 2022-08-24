import {
  CreateAuthorDto,
  IAuthorResponse,
  UpdateAuthorDto,
} from "../entity/dtos/AuthorDto";

import { AuthorEntity } from "../entity/Author";

export interface IAuthor {
  findAuthors(): Promise<IAuthorResponse | AuthorEntity[]>;
  createAuthor(
    createAuthorDto: CreateAuthorDto
  ): Promise<IAuthorResponse | AuthorEntity>;
  updateAuthor(
    id: string,
    updateAuthorDto: UpdateAuthorDto
  ): Promise<IAuthorResponse | AuthorEntity>;

  deleteAuthor(id: string): Promise<IAuthorResponse>;
}

export interface IAuthorRepository extends IAuthor {
  findAuthorByEmail(email: string): Promise<AuthorEntity | null>;
  findAuthorById(id: string): Promise<AuthorEntity | null>;
}

export interface IAuthorService extends IAuthor {
  findAuthor(
    id?: string,
    email?: string,
    search?: string
  ): Promise<IAuthorResponse | AuthorEntity>;
}
